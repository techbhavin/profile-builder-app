import { useMemo, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Descriptions,
  Divider,
  PageHeader,
  Space,
  Spin,
  Tag,
} from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import Text from "antd/lib/typography/Text";
import { useNavigate, useParams } from "react-router-dom";
import { ExperienceType } from "../components/Form/ProfileForm/types";
import { getProfile } from "../services/profile";

const ViewProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isSpin, setIsSpin] = useState(true);

  const profileData = useMemo(() => {
    setIsSpin(false);
    return id ? getProfile(id) : null;
  }, [id]);

  return (
    <>
      <PageHeader
        onBack={() => navigate("/")}
        title="View Profile"
        extra={
          profileData && (
            <Button
              type="primary"
              size="large"
              onClick={() => navigate(`/edit-profile/${profileData.id}`)}
            >
              Edit
            </Button>
          )
        }
      />
      <Divider style={{ marginTop: 0 }} />
      <Spin size="large" spinning={isSpin}>
        {profileData && (
          <Card bordered={false}>
            <Card title="User info">
              <Descriptions bordered>
                <Descriptions.Item
                  label={<Text strong>First name</Text>}
                  span={2}
                >
                  {profileData.firstName}
                </Descriptions.Item>
                <Descriptions.Item
                  label={<Text strong>Last name</Text>}
                  span={2}
                >
                  {profileData.lastName}
                </Descriptions.Item>
                <Descriptions.Item label={<Text strong>Email</Text>} span={2}>
                  {profileData.email}
                </Descriptions.Item>
                <Descriptions.Item
                  label={<Text strong>Tag line</Text>}
                  span={2}
                >
                  {profileData.tagLine}
                </Descriptions.Item>
                <Descriptions.Item label={<Text strong>Skills</Text>} span={2}>
                  {profileData.skills.map((skill: string) => (
                    <Space key={skill}>
                      <Tag color="green">{skill}</Tag>
                    </Space>
                  ))}
                </Descriptions.Item>
              </Descriptions>
            </Card>
            <Card title="Experiences">
              {profileData.experiences.map(
                (exp: ExperienceType, index: number) => (
                  <Descriptions
                    bordered
                    layout="vertical"
                    key={`${exp.company}_${index}`}
                  >
                    <Descriptions.Item
                      label={<Text strong>Company</Text>}
                      span={2}
                    >
                      {exp.company}
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={<Text strong>Role</Text>}
                      span={2}
                    >
                      {exp.role}
                    </Descriptions.Item>
                    {exp.isCurrent && (
                      <Descriptions.Item
                        label={<Text strong>Currently working</Text>}
                        span={2}
                      >
                        <Badge status="processing" text="Running" />
                      </Descriptions.Item>
                    )}
                    <Descriptions.Item
                      label={<Text strong>Start date</Text>}
                      span={2}
                    >
                      {new Date(exp.startDate).toLocaleDateString("en-IN")}
                    </Descriptions.Item>
                    {!exp.isCurrent && (
                      <Descriptions.Item
                        label={<Text strong>End date</Text>}
                        span={2}
                      >
                        {new Date(exp.endDate).toLocaleDateString("en-IN")}
                      </Descriptions.Item>
                    )}
                    <Descriptions.Item
                      label={<Text strong>Description</Text>}
                      span={3}
                    >
                      <Paragraph>{exp.description}</Paragraph>
                    </Descriptions.Item>
                  </Descriptions>
                )
              )}
            </Card>
          </Card>
        )}
      </Spin>
    </>
  );
};

export default ViewProfile;
