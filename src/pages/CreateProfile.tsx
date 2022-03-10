import { Card, Divider, PageHeader } from "antd";
import { useNavigate } from "react-router-dom";
import ProfileForm from "../components/Form/ProfileForm";

const CreateProfile = () => {
  const navigate = useNavigate();
  return (
    <>
      <PageHeader onBack={() => navigate("/")} title="Create Profile" />
      <Divider style={{ marginTop: 0 }} />
      <Card bordered={false}>
        <ProfileForm />
      </Card>
    </>
  );
};

export default CreateProfile;
