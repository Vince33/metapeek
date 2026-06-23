import {render,screen} from "@testing-library/react"; 
import userEvent from "@testing-library/user-event";
import UploadForm from "./UploadForm";
import { extractMetadata } from "../services/api";

vi.mock("../services/api");

describe("UploadForm", () => {
    it("shows an error when submitting with no file selected", async () => {
        render(<UploadForm />);

        const uploadButton = screen.getByText("Upload");
        await userEvent.click(uploadButton);

        expect(screen.getByText("Please select a file.")).toBeInTheDocument();
    });

    it("displays metadata and success toast after a successful upload", async () => {
        const mockMetadata = {format: {duration: "5.312000"}, streams:[]};
        vi.mocked(extractMetadata).mockResolvedValue(mockMetadata);

        render(<UploadForm />);

        const file  = new File(["fake video content"], "test.mp4", { type: "video/mp4" });
        const fileInput = screen.getByLabelText("Choose a video file");
        await userEvent.upload(fileInput, file);

        const uploadButton = screen.getByText("Upload");
        await userEvent.click(uploadButton);
        
        expect(await screen.findByText("Upload successful!")).toBeInTheDocument();
    });

        it("shows fallback error message when a non-Error value is thrown", async () => {
        // const mockMetadata = {format: {duration: "5.312000"}, streams:[]};
        vi.mocked(extractMetadata).mockRejectedValue(("a string error"));

        render(<UploadForm />);

        const file  = new File(["fake video content"], "test.mp4", { type: "video/mp4" });
        const fileInput = screen.getByLabelText("Choose a video file");
        await userEvent.upload(fileInput, file);

        const uploadButton = screen.getByText("Upload");
        await userEvent.click(uploadButton);
        
        expect(await screen.findByText("Something went wrong during upload.")).toBeInTheDocument();
    });

        it("shows the Error's message when a real Error is thrown", async () => {
        // const mockMetadata = {format: {duration: "5.312000"}, streams:[]};
        vi.mocked(extractMetadata).mockRejectedValue(new Error("Upload failed: file too large"));

        render(<UploadForm />);

        const file  = new File(["fake video content"], "test.mp4", { type: "video/mp4" });
        const fileInput = screen.getByLabelText("Choose a video file");
        await userEvent.upload(fileInput, file);

        const uploadButton = screen.getByText("Upload");
        await userEvent.click(uploadButton);
        
        expect(await screen.findByText("Upload failed: file too large")).toBeInTheDocument();
    });
});
