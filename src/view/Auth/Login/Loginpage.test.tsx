import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import LoginPage from "./Login";
import useLogin from "@/hooks/useLogin";

// Mock the useLogin hook
vi.mock("@/hooks/useLogin");

describe("LoginPage", () => {
  const mockUseLogin = {
    form: {
      control: {},
      handleSubmit: vi.fn((fn) => fn),
    },
    handleLogin: vi.fn(),
    handleVisiblePassword: vi.fn(),
    visiblePassword: {
      passwordConfirmation: false,
    },
  };

  beforeEach(() => {
    vi.mocked(useLogin).mockReturnValue(mockUseLogin);
  });

  it("renders login form correctly", () => {
    render(<LoginPage />);

    expect(screen.getByText("Masuk dan Verifikasi")).toBeInTheDocument();
    expect(screen.getByLabelText("Nomor Induk Pegawai")).toBeInTheDocument();
    expect(screen.getByLabelText("Kata Sandi")).toBeInTheDocument();
    expect(screen.getByText("Ingat Saya")).toBeInTheDocument();
    expect(screen.getByText("Lupa Kata Sandi?")).toBeInTheDocument();
    expect(screen.getByText("Masuk")).toBeInTheDocument();
    expect(screen.getByText("atau")).toBeInTheDocument();
    expect(screen.getByText("Masuk dengan Google")).toBeInTheDocument();
  });

  it("shows error when NIP contains symbols", async () => {
    const mockForm = {
      ...mockUseLogin.form,
      formState: {
        errors: {
          nomorIndukPegawai: {
            message: "Nomor Induk Pegawai harus berupa angka",
          },
        },
      },
    };

    vi.mocked(useLogin).mockReturnValue({
      ...mockUseLogin,
      form: mockForm,
    });

    render(<LoginPage />);

    expect(
      screen.getByText("Nomor Induk Pegawai harus berupa angka")
    ).toBeInTheDocument();
  });

  it("shows error when password is too short", async () => {
    const mockForm = {
      ...mockUseLogin.form,
      formState: {
        errors: {
          password: {
            message: "Kata Sandi tidak boleh kurang dari 8 karakter",
          },
        },
      },
    };

    vi.mocked(useLogin).mockReturnValue({
      ...mockUseLogin,
      form: mockForm,
    });

    render(<LoginPage />);

    expect(
      screen.getByText("Kata Sandi tidak boleh kurang dari 8 karakter")
    ).toBeInTheDocument();
  });

  it("toggles password visibility", async () => {
    render(<LoginPage />);

    const toggleButton = screen.getByTestId("password-toggle");
    fireEvent.click(toggleButton);

    expect(mockUseLogin.handleVisiblePassword).toHaveBeenCalledWith(
      "passwordConfirmation"
    );
  });

  it("submits form with valid data", async () => {
    render(<LoginPage />);

    const nipInput = screen.getByLabelText("Nomor Induk Pegawai");
    const passwordInput = screen.getByLabelText("Kata Sandi");
    const submitButton = screen.getByText("Masuk");

    fireEvent.change(nipInput, { target: { value: "1234567890" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockUseLogin.handleLogin).toHaveBeenCalledWith({
        nomorIndukPegawai: "1234567890",
        password: "password123",
      });
    });
  });

  it("shows error when NIP is empty", async () => {
    const mockForm = {
      ...mockUseLogin.form,
      formState: {
        errors: {
          nomorIndukPegawai: {
            message: "Nomor Induk Pegawai tidak boleh kosong",
          },
        },
      },
    };

    vi.mocked(useLogin).mockReturnValue({
      ...mockUseLogin,
      form: mockForm,
    });

    render(<LoginPage />);

    expect(
      screen.getByText("Nomor Induk Pegawai tidak boleh kosong")
    ).toBeInTheDocument();
  });

  it("shows error when password is empty", async () => {
    const mockForm = {
      ...mockUseLogin.form,
      formState: {
        errors: {
          password: {
            message: "Kata Sandi tidak boleh kosong",
          },
        },
      },
    };

    vi.mocked(useLogin).mockReturnValue({
      ...mockUseLogin,
      form: mockForm,
    });

    render(<LoginPage />);

    expect(
      screen.getByText("Kata Sandi tidak boleh kosong")
    ).toBeInTheDocument();
  });

  it("renders remember me checkbox", () => {
    render(<LoginPage />);

    const checkbox = screen.getByLabelText("Ingat Saya");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it("displays lock icon when password is hidden", () => {
    render(<LoginPage />);

    expect(screen.getByTestId("lock-icon")).toBeInTheDocument();
  });

  it("displays unlock icon when password is visible", () => {
    vi.mocked(useLogin).mockReturnValue({
      ...mockUseLogin,
      visiblePassword: {
        passwordConfirmation: true,
      },
    });

    render(<LoginPage />);

    expect(screen.getByTestId("unlock-icon")).toBeInTheDocument();
  });
});
