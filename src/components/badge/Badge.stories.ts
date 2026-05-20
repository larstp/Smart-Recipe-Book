import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: {
    text: 'Default Badge',
    classes: 'bg-blue-100 text-blue-700',
    variant: 'default',
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Success: Story = {
  args: {
    text: 'Success Badge',
    classes: 'bg-green-100 text-green-700',
    variant: 'success',
  },
};

export const Warning: Story = {
  args: {
    text: 'Warning Badge',
    classes: 'bg-yellow-100 text-yellow-700',
    variant: 'warning',
  },
};

export const Destructive: Story = {
  args: {
    text: 'Destructive Badge',
    classes: 'bg-red-100 text-red-700',
    variant: 'destructive',
  },
};
