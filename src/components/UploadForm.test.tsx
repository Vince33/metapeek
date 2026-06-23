import {render,screen} from "@testing-library/react"; 
import userEvent from "@testing-library/user-event";
import UploadForm from "./UploadForm";

describe("UploadForm", () => {
    it("shows an error when submitting with no file selected", async () => {
        render(<UploadForm />);

        const uploadButton = screen.getByText("Upload");
        await userEvent.click(uploadButton);

        expect(screen.getByText("Please select a file.")).toBeInTheDocument();
    });
});