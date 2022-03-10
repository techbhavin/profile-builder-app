import { Card, Divider, PageHeader } from "antd";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProfileForm from "../components/Form/ProfileForm";
import { getProfile } from "../services/profile";

const EditProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const editProfileData = useMemo(() => {
    return id ? getProfile(id) : null;
  }, [id]);

  return (
    <>
      <PageHeader onBack={() => navigate("/")} title="Edit Profile" />
      <Divider style={{ marginTop: 0 }} />
      <Card bordered={false}>
        {editProfileData && (
          <ProfileForm type="update" defaultValues={editProfileData} />
        )}
      </Card>
    </>
  );
};

export default EditProfile;
