import Home from "@/app/page";
import NewGroupPage from '@/app/components/NewGroupPage';
import { initializeDataForNewGroup, getPreviousGroups} from "@/app/lib/LocalStorageWrapper";
import "@testing-library/react/dont-cleanup-after-each";
import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react'
import { useRouter } from "next/navigation";

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

jest.mock("@/app/lib/LocalStorageWrapper", () => ({
    initializeDataForNewGroup: jest.fn(), 
    getPreviousGroups: jest.fn(),
}));



describe('Home component', () => {
    afterAll(() => {
        cleanup();
    });

    render(<Home />);

    test('Renders the title', () => {
        (useRouter as jest.Mock).mockReturnValue({});
        
        expect(screen.getByText("Creá una nueva juntada")).toBeInTheDocument();
    });

    test('Renders subtitle', () => {
        expect(screen.getByText("Ponele un nombre a la juntada")).toBeInTheDocument();
    });

    test('Button not disabled', () => {
        expect(screen.getByText("Comenzar")).not.toBeDisabled();
    });

});




describe('NewGroupPage', () => {
    const mockPush = jest.fn();

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({
            push: mockPush,
        });

        (initializeDataForNewGroup as jest.Mock).mockReturnValue(1);
        (getPreviousGroups as jest.Mock).mockReturnValue([]);

    });

    afterEach(() => {
        jest.clearAllMocks();
        cleanup();
    });

    test('displays error message when form is submitted with empty group name or less than 2 tags', () => {
        render(<NewGroupPage />);

        const input = screen.getAllByPlaceholderText("Ejemplo: Cena en lo de Eric")[0];
        const submitButton = screen.getByRole('button', { name: /comenzar/i });

        fireEvent.click(submitButton);

        expect(screen.getByText("Ponele un nombre a la juntada e ingresa al menos 2 participantes")).toBeInTheDocument();

        fireEvent.change(input, { target: { value: 'Cena' } });
        fireEvent.click(submitButton);

        expect(screen.getByText("Ponele un nombre a la juntada e ingresa al menos 2 participantes")).toBeInTheDocument();
    });


});


