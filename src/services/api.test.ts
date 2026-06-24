import {describe, it, expect, vi, beforeEach } from "vitest";
import { extractMetadata } from "./api";

describe("extractMetadata", () => {
    beforeEach(() => {
        vi.stubGlobal("fetch", vi.fn());
    });

    it("throws the backend's error message when the file is too large", async () =>{
        vi.mocked(fetch).mockResolvedValue({
            ok:false,
            status: 413,
            json: async () => ({ error: "File size exceeds 10 MiB limit"}),
        } as Response);

        const file = new File(["fake content"], "big.mp4", {type: "video/mp4"});

        await expect(extractMetadata(file)).rejects.toThrow("File size exceeds 10 MiB limit");
        });
    });
