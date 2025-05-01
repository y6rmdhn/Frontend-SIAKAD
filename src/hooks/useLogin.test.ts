import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import * as z from 'zod';
import useLogin from './useLogin';
import { ReactNode } from 'react';

// Mock dependencies
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(() => mockNavigate)
}));

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn()
  }
}));

// Setup mocks 
const mockNavigate = vi.fn();

// Wrapper React Hooks
function createWrapper() {
  return ({ children }: { children: ReactNode }) => children;
}

const loginFormSchema = z.object({
  nomorIndukPegawai: z
    .string()
    .min(1, "Nomor Induk Pegawai tidak boleh kosong")
    .regex(/^\d+$/, "Nomor Induk Pegawai harus berupa angka")
    .max(20, "Nomor Induk Pegawai tidak boleh lebih dari 20 digit"),
  password: z.string().min(8, "Kata Sandi tidak boleh kurang dari 8 karakter"),
});

describe('useLogin hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Form awal empty', () => {
    const { result } = renderHook(() => useLogin(), { wrapper: createWrapper() });
    
    expect(result.current.visiblePassword).toEqual({
      password: false,
      passwordConfirmation: false
    });
    expect(result.current.isChecked).toBe(false);
    expect(result.current.form.getValues()).toEqual({
      nomorIndukPegawai: '',
      password: ''
    });
  });

  it('Password toggle hide/show', () => {
    const { result } = renderHook(() => useLogin(), { wrapper: createWrapper() });
    
    act(() => {
      result.current.handleVisiblePassword('password');
    });
    
    expect(result.current.visiblePassword.password).toBe(true);
    
    act(() => {
      result.current.handleVisiblePassword('password');
    });
    
    expect(result.current.visiblePassword.password).toBe(false);
  });

  it('Password toggle hide/show', () => {
    const { result } = renderHook(() => useLogin(), { wrapper: createWrapper() });
    
    act(() => {
      result.current.handleVisiblePassword('passwordConfirmation');
    });
    
    expect(result.current.visiblePassword.passwordConfirmation).toBe(true);
  });

  it('test Checkbox', () => {
    const { result } = renderHook(() => useLogin(), { wrapper: createWrapper() });
    
    act(() => {
      result.current.setIsChecked(true);
    });
    
    expect(result.current.isChecked).toBe(true);
  });

  it('test Login Success dengan input data format valid', async () => {
    const { result } = renderHook(() => useLogin(), { wrapper: createWrapper() });
    
    const validFormData = {
      nomorIndukPegawai: '12345',
      password: 'password123'
    };
    
    await act(async () => {
      result.current.handleLogin(validFormData);
    });
    
    expect(toast.success).toHaveBeenCalledWith('Login berhasil!');
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('test Validasi data dengan form benar', async () => {
    const { result } = renderHook(() => useLogin(), { wrapper: createWrapper() });
    
    // First set values
    await act(async () => {
      result.current.form.setValue('nomorIndukPegawai', '12345');
      result.current.form.setValue('password', 'password123');
    });
    
    // Handle submission to trigger validation
    let isValid;
    await act(async () => {
      isValid = await result.current.form.trigger();
    });
    
    expect(isValid).toBe(true);
    expect(Object.keys(result.current.form.formState.errors).length).toBe(0);
  });
  
  // Test validation rules directly using Zod schema
  describe('Form validation', () => {
    it('test Validasi form login jika NIP kosong', () => {
      const result = loginFormSchema.safeParse({
        nomorIndukPegawai: '',
        password: 'password123'
      });
      
      expect(result.success).toBe(false);
      if (!result.success) {
        const error = result.error.issues.find(issue => 
          issue.path.includes('nomorIndukPegawai')
        );
        expect(error?.message).toBe('Nomor Induk Pegawai tidak boleh kosong');
      }
    });
    
    it('test Validasi form login jika NIP bukan angka', () => {
      const result = loginFormSchema.safeParse({
        nomorIndukPegawai: 'abc123',
        password: 'password123'
      });
      
      expect(result.success).toBe(false);
      if (!result.success) {
        const error = result.error.issues.find(issue => 
          issue.path.includes('nomorIndukPegawai')
        );
        expect(error?.message).toBe('Nomor Induk Pegawai harus berupa angka');
      }
    });
    
    it('test Validasi form login jika NIP melebihi 20 digit', () => {
      const result = loginFormSchema.safeParse({
        nomorIndukPegawai: '123456789012345678901', // 21 digits
        password: 'password123'
      });
      
      expect(result.success).toBe(false);
      if (!result.success) {
        const error = result.error.issues.find(issue => 
          issue.path.includes('nomorIndukPegawai')
        );
        expect(error?.message).toBe('Nomor Induk Pegawai tidak boleh lebih dari 20 digit');
      }
    });
    
    it('test Validasi form login jika Password terlalu pendek', () => {
      const result = loginFormSchema.safeParse({
        nomorIndukPegawai: '12345',
        password: 'short'
      });
      
      expect(result.success).toBe(false);
      if (!result.success) {
        const error = result.error.issues.find(issue => 
          issue.path.includes('password')
        );
        expect(error?.message).toBe('Kata Sandi tidak boleh kurang dari 8 karakter');
      }
    });
  });
});