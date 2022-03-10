import { Button, Card, Col, Row, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { FieldArray, Formik } from "formik";
import {
  Checkbox,
  Input,
  DatePicker,
  ResetButton,
  SubmitButton,
  Select,
  Form,
} from "formik-antd";
import { ExperienceType, ProfileValuesType } from "./types";
import { experiencesFields, initialValues } from "./constant";
import { ProfileValidationSchema } from "./validation";
import { getRandomKey, successMessage } from "../../../utils/utility";
import { addProfile, updateProfile } from "../../../services/profile";

interface ProfileFormProps {
  type?: "create" | "update";
  defaultValues?: ProfileValuesType;
}

const ProfileForm = ({
  type = "create",
  defaultValues = initialValues,
}: ProfileFormProps) => {
  const navigate = useNavigate();
  const isCreateForm = Boolean(type === "create");
  const { id } = defaultValues;

  const successCB = () => {
    isCreateForm
      ? successMessage("Profile added successfully!")
      : successMessage("Profile updated successfully!");
    navigate("/");
  };

  const handleSubmit = (values: ProfileValuesType) => {
    const profileKey = `profile_${getRandomKey()}`;
    isCreateForm
      ? addProfile(
          profileKey,
          JSON.stringify({ ...values, id: profileKey }),
          successCB
        )
      : updateProfile(
          id || profileKey,
          JSON.stringify({ ...values, id: id || profileKey }),
          successCB
        );
  };

  const handleDisabledDate = (current: any) => {
    return current && current > new Date();
  };

  return (
    <Row justify="center">
      <Col xs={24} lg={10}>
        <Formik
          initialValues={defaultValues}
          validationSchema={ProfileValidationSchema}
          onSubmit={(values, actions) => {
            handleSubmit(values);
            actions.setSubmitting(false);
            actions.resetForm();
          }}
          render={({ values, isSubmitting, setFieldValue }) => (
            <Form size="large" layout="vertical">
              <Form.Item label="First Name" name="firstName">
                <Input name="firstName" placeholder="Enter first name" />
              </Form.Item>
              <Form.Item label="Last Name" name="lastName">
                <Input name="lastName" placeholder="Enter last name" />
              </Form.Item>
              <Form.Item label="Email" name="email">
                <Input type="email" name="email" placeholder="Enter email" />
              </Form.Item>
              <Form.Item label="Tagline" name="tagLine">
                <Input
                  name="tagLine"
                  placeholder="Enter tagline (Ex. I am learning rust)"
                />
              </Form.Item>
              <Form.Item label="Skills" name="skills">
                <Select
                  name="skills"
                  mode="tags"
                  open={false}
                  style={{ width: "100%" }}
                  placeholder="Enter skills"
                />
              </Form.Item>
              <FieldArray
                name="experiences"
                render={({ insert, remove, push }) => (
                  <>
                    {values.experiences.length > 0 &&
                      values.experiences.map(
                        (exp: ExperienceType, index: number) => (
                          <Card
                            key={`card_${index}`}
                            type="inner"
                            style={{ width: "100%" }}
                            extra={
                              values.experiences.length > 1 && (
                                <MinusCircleOutlined
                                  onClick={() => remove(index)}
                                />
                              )
                            }
                          >
                            <Form.Item
                              label="Company"
                              name={`experiences.[${index}].company`}
                            >
                              <Input
                                name={`experiences.[${index}].company`}
                                placeholder="Enter company name"
                              />
                            </Form.Item>
                            <Form.Item
                              label="Role"
                              name={`experiences.[${index}].role`}
                            >
                              <Input
                                name={`experiences.[${index}].role`}
                                placeholder="Enter role (Ex. Staff Engineer)"
                              />
                            </Form.Item>
                            <Form.Item
                              name={`experiences.[${index}].isCurrent`}
                            >
                              <Checkbox
                                name={`experiences.[${index}].isCurrent`}
                                onChange={() =>
                                  setFieldValue(
                                    `experiences.[${index}].endDate`,
                                    ""
                                  )
                                }
                              >
                                Is current job
                              </Checkbox>
                            </Form.Item>
                            <Form.Item
                              label="Start date"
                              name={`experiences.[${index}].startDate`}
                            >
                              <DatePicker
                                style={{ width: "100%" }}
                                name={`experiences.[${index}].startDate`}
                                format="DD/MM/YYYY"
                                placeholder="Select start date"
                                disabledDate={handleDisabledDate}
                              />
                            </Form.Item>
                            <Form.Item
                              label="End date"
                              name={`experiences.[${index}].endDate`}
                            >
                              <DatePicker
                                name={`experiences.[${index}].endDate`}
                                placeholder="Select end date"
                                format="DD/MM/YYYY"
                                style={{ width: "100%" }}
                                disabledDate={handleDisabledDate}
                                disabled={values.experiences[index].isCurrent}
                              />
                            </Form.Item>
                            <Form.Item
                              label="Description"
                              name={`experiences.[${index}].description`}
                            >
                              <Input.TextArea
                                name={`experiences.[${index}].description`}
                                placeholder="Enter description"
                                allowClear
                              />
                            </Form.Item>
                          </Card>
                        )
                      )}
                    <Row justify="end" style={{ marginBottom: "24px" }}>
                      <Button
                        type="link"
                        onClick={() => push(experiencesFields)}
                        icon={<PlusOutlined />}
                      >
                        Add Experience
                      </Button>
                    </Row>
                  </>
                )}
              />
              <Row justify="center">
                <Button.Group size="large">
                  <Space size="large">
                    <SubmitButton
                      type="primary"
                      disabled={isSubmitting}
                      loading={isSubmitting}
                    >
                      {isCreateForm ? "Create" : "Update"}
                    </SubmitButton>
                    <ResetButton disabled={isSubmitting} loading={isSubmitting}>
                      Reset
                    </ResetButton>
                  </Space>
                </Button.Group>
              </Row>
            </Form>
          )}
        />
      </Col>
    </Row>
  );
};

export default ProfileForm;
