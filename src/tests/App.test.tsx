import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";
import { describe, expect, it } from "vitest";
import React from "react";

describe("App", () => {
  it("renders Zoznam úloh", () => {
    render(<App />);
    const headerElement = screen.getByText(/zoznam úloh/i);
    expect(headerElement).toBeInTheDocument();
  });

  it('opens the add task modal when "Pridať úlohu" button is clicked', () => {
    render(<App />);
    const addButton = screen.getByRole("button", { name: /pridať úlohu/i });
    fireEvent.click(addButton);
    const inputElement = screen.getByPlaceholderText(/nová úloha/i);
    expect(inputElement).toBeInTheDocument();
  });

  it("adds a new task", () => {
    render(<App />);
    const addButton = screen.getByRole("button", { name: /pridať úlohu/i });
    fireEvent.click(addButton);
    const input = screen.getByPlaceholderText("Nová úloha");
    fireEvent.change(input, { target: { value: "Test Task" } });
    fireEvent.click(screen.getByText("Pridať"));
    expect(screen.getByText("Test Task")).toBeInTheDocument();
  });

  it("updates task status when status button is clicked", () => {
    render(<App />);
    const addButton = screen.getByRole("button", { name: /pridať úlohu/i });
    fireEvent.click(addButton);
    const inputElement = screen.getByPlaceholderText(/nová úloha/i);
    fireEvent.change(inputElement, { target: { value: "Test Task" } });
    const submitButton = screen.getByRole("button", {
      name: /^pridať úlohu$/i,
    });
    fireEvent.click(submitButton);
    const statusButton = screen.getByRole("button", { name: /štart/i });
    fireEvent.click(statusButton);
    expect(screen.getByText("Test Task")).toBeInTheDocument();
  });

  it('deletes a task when "Odstrániť" button is clicked', () => {
    render(<App />);
    const addButton = screen.getByRole("button", { name: /pridať úlohu/i });
    fireEvent.click(addButton);
    const inputElement = screen.getByPlaceholderText(/nová úloha/i);
    fireEvent.change(inputElement, { target: { value: "Test Task" } });
    const submitButton = screen.getByRole("button", {
      name: /^pridať úlohu$/i,
    });
    fireEvent.click(submitButton);
    const deleteButton = screen.getByRole("button", { name: /odstrániť/i });
    fireEvent.click(deleteButton);
    const taskElement = screen.queryByText(/test task/i);
    expect(taskElement).not.toBeInTheDocument();
  });
});
