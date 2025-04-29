import { renderHook } from '@testing-library/react';
import { useLatest } from './useLatest';
import { describe, it, expect } from 'vitest';

describe('useLatest', () => {
  it('should initialize with the provided value', () => {
    const { result } = renderHook(() => useLatest('initial'));

    expect(result.current.current).toBe('initial');
  });

  it('should update ref.current when value changes', () => {
    let value = 'first';
    const { result, rerender } = renderHook(() => useLatest(value));

    expect(result.current.current).toBe('first');

    value = 'second';
    rerender();

    expect(result.current.current).toBe('second');
  });

  it('should always return the same ref object', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useLatest(value),
      { initialProps: { value: 'initial' } }
    );

    const firstRef = result.current;

    rerender({ value: 'updated' });

    const secondRef = result.current;

    expect(firstRef).toBe(secondRef);
  });
});
