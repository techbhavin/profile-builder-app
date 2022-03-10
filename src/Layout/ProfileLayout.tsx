import { ReactElement } from "react";
import Layout, { Content } from "antd/lib/layout/layout";
import { Button, Divider, PageHeader } from "antd";
import { useNavigate } from "react-router-dom";

interface ProfileLayoutProps {
  children: ReactElement;
}

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  const navigate = useNavigate();

  return (
    <Layout style={{ height: "100vh", backgroundColor: "white" }}>
      <PageHeader
        title="Profiles"
        extra={
          <Button
            type="primary"
            size="large"
            onClick={() => navigate("create-profile")}
          >
            Create
          </Button>
        }
      />
      <Divider style={{ marginTop: 0 }} />
      <Content>{children}</Content>
    </Layout>
  );
};

export default ProfileLayout;
