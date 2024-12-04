import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";
import OnBoarding from "./pages/OnBoarding";
import userEvent from "@testing-library/user-event";
import CreateShoplistModal from "./components/CreateShoplistModal";

describe("something truthy and falsy", () => {
  it("true to be true", () => {
    expect(true).toBe(true);
  });

  it("false to be false", () => {
    expect(false).toBe(false);
  });
});

// describe("App component", () => {
//   it("renders correct page", () => {
//     render(<App />);
//     expect(screen.getByRole("heading").textContent).toMatch(/our first test/i);
//   });
// });

// describe("Onboarding component", () => {
//   it("renders the create new app modal", async () => {
//     const user = userEvent.setup();

//     render(<OnBoarding />);
//     const button = screen.getByText("Create a new shoplist");
//     await user.click(button);
//     const { container } = render(
//       <CreateShoplistModal
//         handleCloseModal={() => setIsCreateShoplist(false)}
//       />
//     );
//     const div = container.querySelector(".modal-main-container");
//     expect(div).toHaveTextContent("Create a new shoplist");
//   });
// });
