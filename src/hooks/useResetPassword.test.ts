import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, render } from '@testing-library/react';
import { toast } from 'sonner';
import { z } from 'zod';
import useResetPassword from './useResetPassword';


// Mock dependencies
const navigateMock = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => navigateMock
}));

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn()
  }
}));


const resetFormSchema = z
.object({
  email: z.string().email("Format email tidak valid"),
  newPassword: z
    .string()
    .min(8, "Kata sandi tidak boleh kurang dari 8 karakter"),
  repeatPassword: z
    .string()
    .min(8, "Kata sandi tidak boleh kurang dari 8 karakter"),
})
.superRefine(({ newPassword, repeatPassword }, ctx) => {
  if (newPassword !== repeatPassword) {
    ctx.addIssue({
      code: "custom",
      message: "Password tidak sama",
      path: ["repeatPassword"],
    });
  }
});



// Mock for React Hook Form
const formMock = {
  reset: vi.fn(),
  setValue: vi.fn(),
  getValues: vi.fn().mockReturnValue({ email: '' }),
  trigger: vi.fn().mockResolvedValue(true),
  handleSubmit: vi.fn(cb => (data) => cb(data)),
  formState: { 
    errors: {},
    isSubmitting: false 
  },
  register: vi.fn(),
  watch: vi.fn()
};

vi.mock('react-hook-form', () => ({
  useForm: () => formMock
}));

vi.mock('@hookform/resolvers/zod', () => ({
  zodResolver: vi.fn(schema => schema)
}));

describe('useResetPassword', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Reset form mock for each test
    formMock.reset.mockClear();
    formMock.setValue.mockClear();
    formMock.getValues.mockReturnValue({ email: '' });
    formMock.formState.errors = {};
  });

  it('Inisiasi form default value', () => {
    const { result } = renderHook(() => useResetPassword());
    
    expect(result.current.isEmailValid).toBe(false);
    expect(result.current.form).toBe(formMock);
  });

  it('testing handle submit request email', async () => {
    const consoleSpy = vi.spyOn(console, 'log');
    
    const { result } = renderHook(() => useResetPassword());
    
    // Submit valid email
    await act(async () => {
      result.current.handleSubmitForm({ email: 'test@example.com' });
    });
    
    // Check that email is processed correctly
    expect(consoleSpy).toHaveBeenCalledWith('Email dikirim:', { email: 'test@example.com' });
    expect(result.current.isEmailValid).toBe(true);
    expect(formMock.reset).toHaveBeenCalledWith({
      email: 'test@example.com',
      newPassword: '',
      repeatPassword: ''
    });
    
    consoleSpy.mockRestore();
  });

  it('handle password reset dengan benar', async () => {
    const consoleSpy = vi.spyOn(console, 'log');
    
    const { result } = renderHook(() => useResetPassword());
    
    // First set isEmailValid to true to simulate the state after email validation
    await act(async () => {
      result.current.handleSubmitForm({ email: 'test@example.com' });
    });
    
    // Reset mocks for the next test
    consoleSpy.mockClear();
    formMock.reset.mockClear();
    
    // Now submit the password reset form
    const resetData = {
      email: 'test@gmail.com',
      newPassword: 'password123',
      repeatPassword: 'password123'
    };
    
    await act(async () => {
      result.current.handleSubmitForm(resetData);
    });
    
    // Check that the password is reset
    expect(consoleSpy).toHaveBeenCalledWith('Password direset:', resetData);
    expect(toast.success).toHaveBeenCalledWith('Password berhasil diubah');
    expect(navigateMock).toHaveBeenCalledWith('/login');
    expect(result.current.isEmailValid).toBe(false);
    expect(formMock.reset).toHaveBeenCalled();
    
    consoleSpy.mockRestore();
  });

  it('testing handle Submit berdasarkan set IsEmailValid', async () => {
    const  {result}  = renderHook(() => useResetPassword());
    
    const handleSendEmailSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    
    // Test email submission flow
    await act(async () => {
      result.current.handleSubmitForm({ email: 'test@example.com' });
    });
    
    expect(handleSendEmailSpy).toHaveBeenCalledWith('Email dikirim:', { email: 'test@example.com' });
    expect(result.current.isEmailValid).toBe(true);
    
    // Reset spy
    handleSendEmailSpy.mockClear();
    
    // Test password reset flow
    await act(async () => {
      result.current.handleSubmitForm({
        email: 'test@example.com',
        newPassword: 'password123',
        repeatPassword: 'password123'
      });
    });
    
    expect(handleSendEmailSpy).toHaveBeenCalledWith('Password direset:', {
      email: 'test@example.com',
      newPassword: 'password123',
      repeatPassword: 'password123'
    });
    
    handleSendEmailSpy.mockRestore();
  });

  describe('Form Validation Reset Password', () => {
    it('Format email tidak valid', ()=>{
        const result = resetFormSchema.safeParse({
            email: '@#@!testexample.com',
            newPassword: 'password123',
            repeatPassword: 'password123',
        });

        expect(result.success).toBe(false);
        if(!result.success){
            const error = result.error.issues.find(issue => issue.path.includes('email'));
            expect(error?.message).toBe('Format email tidak valid');
        }
    });

    it('Format kata sandi terlalu pendek', ()=>{
        const result = resetFormSchema.safeParse({
            email: 'test@gmail.com',
            newPassword: 'Short',
            repeatPassword: 'Short',
        });
    
        expect(result.success).toBe(false);
        if(!result.success){
            const error = result.error.issues.find(issue => issue.path.includes('newPassword') || issue.path.includes('repeatPassword'));
    
            expect(error).toBeDefined();
            expect(error?.message).toBe('Kata sandi tidak boleh kurang dari 8 karakter');
        }
    });
    
    it('Form repeatPassword tidak sama', ()=>{
        const result = resetFormSchema.safeParse({
            email: 'test@gmail.com',
            newPassword: 'Short2121',
            repeatPassword: 'Short1212',
        });
    
        expect(result.success).toBe(false);
        if(!result.success){
            const error = result.error.issues.find(issue => issue.path.includes('newPassword') || issue.path.includes('repeatPassword'));
    
            expect(error).toBeDefined();
            expect(error?.message).toBe('Password tidak sama');
        }
    });


  });
});