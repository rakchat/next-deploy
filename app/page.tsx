"use client";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { UserAPI } from "./libs/services";
import { useRouter } from "next/navigation";
import { ColumnsType } from "antd/es/table";
import {
  TABLE_CURRENT_PAGE,
  TABLE_PAGE_SIZE,
  TABLE_PAGE_SIZE_OPTION,
} from "./libs/const";
import { BaseQueryParams, ITableSorter, IUsers } from "./libs/type";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import { initialPagination, getURLQueryParams, sortQuery } from "./libs/helper";
import { CloseCircleFilled, SearchOutlined } from "@ant-design/icons";
import {
  Card,
  Col,
  Form,
  Input,
  Row,
  Spin,
  Table,
  TablePaginationConfig,
} from "antd";

export default function Home({
  params: _params,
  searchParams: queryParams,
}: {
  params: { slug: string };
  searchParams: BaseQueryParams;
}) {
  const router = useRouter();
  const [users, setUsers] = useState<IUsers[]>([]);
  const [pagination, setPagination] =
    useState<TablePaginationConfig>(initialPagination);
  const [formSearch] = Form.useForm();
  const [valueSearch, setValueSearch] = useState<string>("");

  const fetcherUsers = (_key: string, queryParam: BaseQueryParams) => {
    if (!Object.keys(queryParam).length) {
      queryParam.size = TABLE_PAGE_SIZE;
      queryParam.sortBy = "id";
      queryParam.orderBy = "DESC";
    }
    return UserAPI.findAll(queryParam);
  };
  const { data: fetchResult, isValidating: fetching } = useSWR(
    ["key-users", queryParams],
    ([key, params]) => fetcherUsers(key, params)
  );

  useEffect(() => {
    if (!fetching) {
      const { data, perPage, total } = fetchResult ?? {};
      setUsers(data?.length ? data : []);
      setPagination({
        ...pagination,
        current: Number(queryParams?.page ?? TABLE_CURRENT_PAGE),
        pageSize: perPage ?? TABLE_PAGE_SIZE,
        ...(total && { total: total }),
      });
    }
  }, [fetching, fetchResult]);

  const handleTableChange = (
    paginations: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    sorter: SorterResult<IUsers> | SorterResult<IUsers>[]
  ) => {
    const { field, order } = sorter as ITableSorter;
    const query = {
      ...queryParams,
      size: paginations.pageSize ?? TABLE_PAGE_SIZE,
      page: paginations.current ?? TABLE_CURRENT_PAGE,
      ...(order && { orderBy: order.slice(0, -3).toUpperCase() }),
      ...(field && { sortBy: field && order ? field : "id" }),
      query: valueSearch,
    };

    router.push(getURLQueryParams(query), { scroll: false });
  };

  const submitSearch = async (values: { search: string }) => {
    const { search } = values;
    setValueSearch(search);
    const query = {
      ...queryParams,
      query: search,
      page: 1,
    };
    router.push(getURLQueryParams(query), { scroll: false });
  };

  const onFieldClear = () => {
    submitSearch({ search: "" });
  };

  const columns: ColumnsType<IUsers> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 50,
      sorter: true,
      sortOrder: sortQuery(queryParams, "name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 50,
      sorter: true,
      sortOrder: sortQuery(queryParams, "email"),
    },
  ];

  return (
    <main>
      <div>
        <Row>
          <Col xs={24} sm={12} md={12} lg={8} xl={6} xxl={6}>
            <Form form={formSearch} onFinish={submitSearch}>
              <Form.Item name="search">
                <Input
                  allowClear={{
                    clearIcon: <CloseCircleFilled onClick={onFieldClear} />,
                  }}
                  size="middle"
                  placeholder={"search name or email"}
                  prefix={<SearchOutlined />}
                />
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <Table
          scroll={{ x: 1100 }}
          columns={columns}
          dataSource={users}
          rowKey={(record) => record.id}
          pagination={{
            ...pagination,
            showSizeChanger: true,
            pageSizeOptions: TABLE_PAGE_SIZE_OPTION,
          }}
          loading={fetching}
          onChange={handleTableChange}
        />
        {!fetching ? (
          <div>
            <Row gutter={[16, 24]}>
              {users?.map((item) => {
                const { id } = item ?? {};
                return (
                  <Col key={id} xs={12} sm={12} md={12} lg={8} xl={6} xxl={6}>
                    <Card title={item.name}>
                      <p>Email: {item.email}</p>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </div>
        ) : (
          <div className="h-[100vh] w-full flex justify-center items-center">
            <Spin />
          </div>
        )}
      </div>
    </main>
  );
}
