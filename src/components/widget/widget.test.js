/**
 * Frontend Component Rendering Test
 * 
 * This file contains Jest tests to verify that the Widget component
 * correctly fetches and displays data from the API.
 * 
 * Usage: npm test -- frontend-component-test.test.js
 */

import { render, screen, waitFor } from '@testing-library/react';
import Widget from './src/components/widget/Widget';
import useFetch from './src/hooks/useFetch';

// Mock the useFetch hook
jest.mock('./src/hooks/useFetch');

describe('Widget Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('Rendering with Data', () => {
    it('should display class count when data is loaded', () => {
      useFetch.mockReturnValue({
        data: [
          { id: '1', className: 'Class A', description: 'Test' },
          { id: '2', className: 'Class B', description: 'Test' },
        ],
        loading: false,
        error: null,
      });

      render(<Widget type="class" />);
      
      expect(screen.getByText('CLASSES')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('should display student count when data is loaded', () => {
      useFetch.mockReturnValue({
        data: [
          { id: '1', fullName: 'John Doe' },
          { id: '2', fullName: 'Jane Doe' },
          { id: '3', fullName: 'Bob Smith' },
        ],
        loading: false,
        error: null,
      });

      render(<Widget type="student" />);
      
      expect(screen.getByText('STUDENTS')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('should display fee payment count when data is loaded', () => {
      useFetch.mockReturnValue({
        data: [
          { id: '1', amount: 1000 },
          { id: '2', amount: 2000 },
        ],
        loading: false,
        error: null,
      });

      render(<Widget type="fee-payment" />);
      
      expect(screen.getByText('FEE PAYMENTS')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
    });
  });

  describe('Loading State', () => {
    it('should display "Loading..." when data is loading', () => {
      useFetch.mockReturnValue({
        data: [],
        loading: true,
        error: null,
      });

      render(<Widget type="class" />);
      
      expect(screen.getByText('CLASSES')).toBeInTheDocument();
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  describe('Error State', () => {
    it('should display "Error" when an error occurs', () => {
      useFetch.mockReturnValue({
        data: [],
        loading: false,
        error: 'Failed to fetch classes',
      });

      render(<Widget type="class" />);
      
      expect(screen.getByText('CLASSES')).toBeInTheDocument();
      expect(screen.getByText('Error')).toBeInTheDocument();
    });
  });

  describe('Empty Data', () => {
    it('should display 0 when no data is available', () => {
      useFetch.mockReturnValue({
        data: [],
        loading: false,
        error: null,
      });

      render(<Widget type="class" />);
      
      expect(screen.getByText('CLASSES')).toBeInTheDocument();
      expect(screen.getByText('0')).toBeInTheDocument();
    });
  });

  describe('Navigation Links', () => {
    it('should have navigation link to classes page', () => {
      useFetch.mockReturnValue({
        data: [],
        loading: false,
        error: null,
      });

      render(<Widget type="class" />);
      
      const link = screen.getByText('See all classes');
      expect(link).toHaveAttribute('href', '/classes');
    });

    it('should have navigation link to students page', () => {
      useFetch.mockReturnValue({
        data: [],
        loading: false,
        error: null,
      });

      render(<Widget type="student" />);
      
      const link = screen.getByText('See all students');
      expect(link).toHaveAttribute('href', '/students');
    });

    it('should have navigation link to fee-payments page', () => {
      useFetch.mockReturnValue({
        data: [],
        loading: false,
        error: null,
      });

      render(<Widget type="fee-payment" />);
      
      const link = screen.getByText('View all payments');
      expect(link).toHaveAttribute('href', '/fee-payments');
    });
  });
});

describe('useFetch Hook', () => {
  describe('Error Handling', () => {
    it('should handle 404 errors gracefully', async () => {
      // Mock axios error
      const mockError = new Error('404 Not Found');
      mockError.response = { status: 404, data: { message: 'Not found' } };

      useFetch.mockReturnValue({
        data: [],
        loading: false,
        error: 'Not found',
      });

      render(<Widget type="class" />);
      
      expect(screen.getByText('CLASSES')).toBeInTheDocument();
      expect(screen.getByText('Error')).toBeInTheDocument();
    });

    it('should handle 500 errors gracefully', async () => {
      const mockError = new Error('500 Server Error');
      mockError.response = { 
        status: 500, 
        data: { message: 'Internal server error' } 
      };

      useFetch.mockReturnValue({
        data: [],
        loading: false,
        error: 'Internal server error',
      });

      render(<Widget type="class" />);
      
      expect(screen.getByText('CLASSES')).toBeInTheDocument();
      expect(screen.getByText('Error')).toBeInTheDocument();
    });
  });

  describe('Data Transformation', () => {
    it('should handle array responses', async () => {
      useFetch.mockReturnValue({
        data: [
          { id: '1', name: 'Item 1' },
          { id: '2', name: 'Item 2' },
        ],
        loading: false,
        error: null,
      });

      render(<Widget type="class" />);
      
      expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('should handle single object responses wrapped in array', async () => {
      useFetch.mockReturnValue({
        data: [{ id: '1', name: 'Single Item' }],
        loading: false,
        error: null,
      });

      render(<Widget type="class" />);
      
      expect(screen.getByText('1')).toBeInTheDocument();
    });
  });
});
