import { Link } from "react-router";
import { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, Spin, message } from "antd";
import { FiArrowRight, FiLock, FiUser } from "react-icons/fi";
import dayjs, { type Dayjs } from "dayjs";
import { useAuth } from "../hooks/useAuth";
import { useCustomerProfile } from "../hooks/useProfile";
import { mainPath } from "../data/constant";
import {
  ProfileError,
  changeCustomerPassword,
  getProfileFormValues,
  saveCustomerProfile,
} from "../services/profileService";

interface ProfileFormValues {
  name: string;
  lastName: string;
  phone: string;
  mobilePhone: string;
  birthDate?: Dayjs | null;
}

interface PasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ProfilePage() {
  const { isAuthenticated, user, loading: authLoading } = useAuth();
  const customer = useCustomerProfile(user?.id);
  const [profileForm] = Form.useForm<ProfileFormValues>();
  const [passwordForm] = Form.useForm<PasswordFormValues>();
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    if (!customer) return;
    const values = getProfileFormValues(customer);
    profileForm.setFieldsValue({
      ...values,
      birthDate: values.birthDate ? dayjs(values.birthDate) : null,
    });
  }, [customer, profileForm]);

  if (authLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-5 rounded-lg bg-[#eef8fd] flex items-center justify-center">
            <FiUser className="w-8 h-8 text-[#00A8E8]" />
          </div>
          <h1 className="text-2xl font-bold text-[#003459] mb-2">Profilim</h1>
          <p className="text-gray-500 mb-6">Profilinizi redaktə etmək üçün daxil olun.</p>
          <Link
            to={mainPath.login.main}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#00A8E8] text-white font-semibold hover:bg-[#0096D1] transition-colors"
          >
            Daxil ol
            <FiArrowRight />
          </Link>
        </div>
      </section>
    );
  }

  const handleProfileSave = async (values: ProfileFormValues) => {
    setSavingProfile(true);
    try {
      await saveCustomerProfile(user.id, {
        name: values.name,
        lastName: values.lastName,
        phone: values.phone,
        mobilePhone: values.mobilePhone,
        birthDate: values.birthDate ? values.birthDate.format("YYYY-MM-DD") : null,
      });
      message.success("Profil məlumatları yeniləndi");
    } catch (error) {
      message.error(error instanceof ProfileError ? error.message : "Yeniləmə alınmadı");
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordSave = async (values: PasswordFormValues) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error("Yeni şifrələr uyğun gəlmir");
      return;
    }

    setSavingPassword(true);
    try {
      await changeCustomerPassword(user.id, values.currentPassword, values.newPassword);
      passwordForm.resetFields();
      message.success("Şifrə uğurla dəyişdirildi");
    } catch (error) {
      message.error(error instanceof ProfileError ? error.message : "Şifrə dəyişdirilmədi");
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <section className="min-h-screen py-8 md:py-12">
      <div className="container mx-auto">
        <div className="mb-8 pb-4 border-b border-gray-200">
          <p className="text-[#00A8E8] text-xs font-bold uppercase tracking-[0.2em] mb-2">
            Hesab
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-[#003459]">Profilim</h1>
          <p className="text-gray-500 text-sm mt-1">Şəxsi məlumatlarınızı redaktə edin</p>
        </div>

        {customer === undefined ? (
          <div className="flex justify-center py-20">
            <Spin size="large" />
          </div>
        ) : customer === null ? (
          <div className="rounded-lg border border-gray-200 bg-white p-8 text-center text-gray-500">
            Profil məlumatları tapılmadı
          </div>
        ) : (
          <div className="space-y-6">
            <div className="rounded-lg border border-gray-200 bg-white p-5 sm:p-6">
              <h2 className="text-base font-semibold text-[#003459] mb-4">Hesab məlumatları</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { label: "Kod", value: customer.code },
                  { label: "Qrup", value: customer.group },
                  { label: "Filial", value: customer.department },
                  { label: "Valyuta", value: customer.currencyCode },
                  { label: "Qiymət sinfi", value: String(customer.priceClass) },
                  {
                    label: "Status",
                    value: customer.isActive === 1 ? "Aktiv" : "Deaktiv",
                  },
                ].map((item) => (
                  <div key={item.label} className="rounded-lg bg-gray-50 border border-gray-100 px-3 py-2">
                    <p className="text-[10px] uppercase tracking-wide text-gray-400 mb-0.5">
                      {item.label}
                    </p>
                    <p className="text-sm font-medium text-[#003459] truncate">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-5 sm:p-6">
              <h2 className="text-base font-semibold text-[#003459] mb-4">Şəxsi məlumatlar</h2>
              <Form form={profileForm} layout="vertical" onFinish={handleProfileSave}>
                <div className="grid sm:grid-cols-2 gap-x-4">
                  <Form.Item
                    name="name"
                    label="Ad"
                    rules={[{ required: true, message: "Ad tələb olunur" }]}
                  >
                    <Input size="large" className="rounded-lg" />
                  </Form.Item>
                  <Form.Item
                    name="lastName"
                    label="Soyad"
                    rules={[{ required: true, message: "Soyad tələb olunur" }]}
                  >
                    <Input size="large" className="rounded-lg" />
                  </Form.Item>
                </div>

                <div className="grid sm:grid-cols-2 gap-x-4">
                  <Form.Item
                    name="phone"
                    label="Telefon"
                    rules={[
                      {
                        validator: (_, value) => {
                          const mobile = profileForm.getFieldValue("mobilePhone");
                          if (!value && !mobile) {
                            return Promise.reject(new Error("Ən azı bir nömrə daxil edin"));
                          }
                          if (!value) return Promise.resolve();
                          const digits = String(value).replace(/\D/g, "");
                          if (digits.length >= 9) return Promise.resolve();
                          return Promise.reject(new Error("Düzgün nömrə daxil edin"));
                        },
                      },
                    ]}
                  >
                    <Input size="large" placeholder="055 375 85 00" className="rounded-lg" />
                  </Form.Item>
                  <Form.Item
                    name="mobilePhone"
                    label="Mobil telefon"
                    rules={[
                      {
                        validator: (_, value) => {
                          if (!value) return Promise.resolve();
                          const digits = String(value).replace(/\D/g, "");
                          if (digits.length >= 9) return Promise.resolve();
                          return Promise.reject(new Error("Düzgün nömrə daxil edin"));
                        },
                      },
                    ]}
                  >
                    <Input size="large" placeholder="070 333 11 35" className="rounded-lg" />
                  </Form.Item>
                </div>

                <Form.Item name="birthDate" label="Doğum tarixi">
                  <DatePicker
                    className="w-full rounded-lg h-10"
                    format="DD.MM.YYYY"
                    placeholder="Tarix seçin"
                  />
                </Form.Item>

                <Button
                  type="primary"
                  htmlType="submit"
                  loading={savingProfile}
                  className="h-11 px-6 rounded-lg font-semibold bg-[#00A8E8] hover:bg-[#0096D1]! border-none"
                >
                  Dəyişiklikləri saxla
                </Button>
              </Form>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <FiLock className="text-[#00A8E8]" />
                <h2 className="text-base font-semibold text-[#003459]">Şifrə dəyişikliyi</h2>
              </div>

              <Form form={passwordForm} layout="vertical" onFinish={handlePasswordSave}>
                <Form.Item
                  name="currentPassword"
                  label="Cari şifrə"
                  rules={[{ required: true, message: "Cari şifrə tələb olunur" }]}
                >
                  <Input.Password size="large" className="rounded-lg" />
                </Form.Item>
                <div className="grid sm:grid-cols-2 gap-x-4">
                  <Form.Item
                    name="newPassword"
                    label="Yeni şifrə"
                    rules={[
                      { required: true, message: "Yeni şifrə tələb olunur" },
                      { min: 6, message: "Minimum 6 simvol" },
                    ]}
                  >
                    <Input.Password size="large" className="rounded-lg" />
                  </Form.Item>
                  <Form.Item
                    name="confirmPassword"
                    label="Yeni şifrə (təkrar)"
                    rules={[{ required: true, message: "Təkrar şifrə tələb olunur" }]}
                  >
                    <Input.Password size="large" className="rounded-lg" />
                  </Form.Item>
                </div>
                <Button
                  htmlType="submit"
                  loading={savingPassword}
                  className="h-11 px-6 rounded-lg font-semibold border-gray-200"
                >
                  Şifrəni yenilə
                </Button>
              </Form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
