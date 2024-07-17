"use client";
import React, { useEffect } from "react";
import { Card, Col, Row, Space, Spin } from "antd";
import useSWR from "swr";
import { UserAPI } from "./libs/services";
import { BaseQueryParams } from "./libs/type";

const fetcherUsers = (_key: string, queryParam: BaseQueryParams) => {
  //   queryParam.size = 10;
  //   queryParam.sortBy = "";
  //   queryParam.orderBy = "DESC";
  return UserAPI.findAll();
};

export default function Home() {
  const {
    data: users,
    isValidating: fetching,
    mutate,
  } = useSWR(["next-users", {}], ([key, params]) => fetcherUsers(key, params));

  // useEffect(() => {
  //   if (!fetching) {
  //     // const { data, perPage, total } = fetchResult ?? {};
  //     // setDataSource(data?.length ? data : []);
  //     // setPagination({
  //     //   // ...pagination,
  //     //   // current: Number(queryParam?.page ?? TABLE_CURRENT_PAGE),
  //     //   // pageSize: perPage ?? TABLE_PAGE_SIZE,
  //     //   // ...(total && { total: total }),
  //     // });
  //   }
  // }, [fetching, fetchResult]);

  return (
    <main>
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
    </main>
  );
}
