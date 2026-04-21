import type { Meta, StoryObj } from "@storybook/react";
import SystemMessage from "./system-messages";

const meta: Meta<typeof SystemMessage> = {
  title: "Components/SystemMessage",
  component: SystemMessage,
  argTypes: {
    type: {
      control: "select",
      options: ["error", "warning", "success", "info"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof SystemMessage>;

export const Error: Story = {
  args: {
    type: "error",
    children: "Ocorreu um erro ao carregar os dados.",
  },
};

export const Warning: Story = {
  args: {
    type: "warning",
    children: "Atenção: alguns dados podem estar desatualizados.",
  },
};

export const Success: Story = {
  args: {
    type: "success",
    children: "Operação realizada com sucesso!",
  },
};

export const Info: Story = {
  args: {
    type: "info",
    children: "Nenhum usuário encontrado para os filtros selecionados.",
  },
};
