import Home from "@/app/page";
import { render, screen } from '@testing-library/react'
import { useRouter } from "next/navigation";

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe('Home component', () => {
    it('Renders the title', () => {
        (useRouter as jest.Mock).mockReturnValue({});
        render(<Home />)
        expect(screen.getByText("¿Hacemos números?")).toBeInTheDocument();
    })
})