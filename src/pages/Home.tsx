import { useMemo, useState } from "react";
import { Table, Tag, Space, Row, Col, Spin, Card } from "antd";
import { Link } from "react-router-dom";
import ProfileLayout from "../Layout/ProfileLayout";
import { getAllProfiles } from "../services/profile";

const Home = () => {
  const [isSpin, setIsSpin] = useState(true);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text: string, record: { [key: string]: any }) => {
        return (
          <Link to={`/view-profile/${record.id}`}>
            {record.firstName} {record.lastName}
          </Link>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Tagline",
      dataIndex: "tagLine",
    },
    {
      title: "Skills",
      dataIndex: "skills",

      render: (skills: string[]) => (
        <>
          {skills.map((skill: string) => (
            <Tag color="green" key={skill}>
              {skill.toUpperCase()}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record: { [key: string]: any }) => (
        <Space size="middle">
          <Link to={`/view-profile/${record.id}`}>View</Link>
          <Link to={`/edit-profile/${record.id}`}>Edit</Link>
        </Space>
      ),
    },
  ];

  const profileData = useMemo(() => {
    const profiles = getAllProfiles();
    setIsSpin(false);
    if (profiles && profiles?.length > 0) {
      return profiles.map((p) => ({ key: p.id, ...p }));
    }
    return [];
  }, []);

  return (
    <ProfileLayout>
      <Card bordered={false}>
        <Row justify="center">
          <Col xs={22} lg={16}>
            <Spin size="large" spinning={isSpin}>
              <Table
                bordered
                columns={columns}
                dataSource={profileData}
                scroll={{ x: true }}
                pagination={{ position: ["bottomCenter"] }}
              />
            </Spin>
          </Col>
        </Row>
      </Card>
    </ProfileLayout>
  );
};

export default Home;
