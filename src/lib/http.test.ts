import { beforeEach, describe, expect, it } from "vitest";
import { http } from "./http";
import { vi, Mock } from "vitest";

describe("http", () => {
  const mockResponse = { success: true };
  let mockJson: Mock;

  beforeEach(() => {
    vi.resetAllMocks();

    mockJson = vi.fn().mockResolvedValue(mockResponse);

    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: mockJson,
    });
  });

  it("should perform a GET request correctly", async () => {
    const data = await http.get<{ success: boolean }>("test-endpoint");
    expect(fetch).toHaveBeenCalledWith(
      "/api/test-endpoint",
      expect.objectContaining({
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: expect.any(String),
        },
      })
    );

    expect(data).toEqual({ success: true });
  });

  it("should perform a POST request correctly", async () => {
    const body = {
      name: "Test name",
    };
    const data = await http.post<typeof body, { success: boolean }>(
      "test-endpoint",
      body
    );
    expect(fetch).toHaveBeenCalledWith(
      "/api/test-endpoint",
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: expect.any(String),
        },
        body: JSON.stringify(body),
      })
    );

    expect(data).toEqual({ success: true });
  });

  it("should perform a PUT request correctly", async () => {
    const body = {
      name: "Test name updated",
    };
    const data = await http.put<typeof body, { success: boolean }>(
      "test-endpoint",
      body
    );
    expect(fetch).toHaveBeenCalledWith(
      "/api/test-endpoint",
      expect.objectContaining({
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: expect.any(String),
        },
        body: JSON.stringify(body),
      })
    );

    expect(data).toEqual({ success: true });
  });

  it("should perform a DELETE request correctly", async () => {
    const data = await http.delete<{ success: boolean }>("test-endpoint");
    expect(fetch).toHaveBeenCalledWith(
      "/api/test-endpoint",
      expect.objectContaining({
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: expect.any(String),
        },
      })
    );

    expect(data).toEqual({ success: true });
  });

  it("Should throw error in case of an api error", async () => {
    (fetch as Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      text: vi.fn().mockResolvedValue("Internal Server Error"),
    });
    await expect(http.get("test-endpoint")).rejects.toThrowError(
      new Error("Api error: 500 Internal Server Error")
    );
  });
});
