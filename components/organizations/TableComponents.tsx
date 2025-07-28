'use client';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Select, SelectOption } from '@/components/ui/Select';
import { Switch } from '@/components/ui/Switch';
import { Typography } from '@/components/ui/Typography';

// Status badge component
interface StatusBadgeProps {
  approved: boolean;
  withdrawn: boolean;
}

export const StatusBadge = ({ approved, withdrawn }: StatusBadgeProps) => {
  const getVariant = () => {
    if (withdrawn) return 'muted';
    return approved ? 'success' : 'warning';
  };
  
  const text = withdrawn ? '탈퇴' : (approved ? '승인' : '신청');
  
  return (
    <Badge variant={getVariant()} size="sm" title={text}>
      {text}
    </Badge>
  );
};

// Admin selector component
interface AdminSelectorProps {
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const AdminSelector = ({
  value,
  options,
  onChange,
  disabled = false,
}: AdminSelectorProps) => {
  return (
    <Select
      options={options}
      value={value}
      onValueChange={onChange}
      placeholder="관리자 선택"
      size="sm"
      className="w-full min-w-0"
      disabled={disabled}
    />
  );
};

// Approval switch component
interface ApprovalSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export const ApprovalSwitch = ({ checked, onChange, disabled = false }: ApprovalSwitchProps) => {
  return <Switch checked={checked} onCheckedChange={onChange} disabled={disabled} />;
};

// Withdrawal switch component
interface WithdrawalSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export const WithdrawalSwitch = ({
  checked,
  onChange,
  disabled = false,
}: WithdrawalSwitchProps) => {
  return <Switch checked={checked} onCheckedChange={onChange} disabled={disabled} />;
};

// Delete button component
interface DeleteButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export const DeleteButton = ({ onClick, disabled = false }: DeleteButtonProps) => {
  return (
    <Button
      variant="link"
      size="sm"
      className="w-full min-w-0 text-center text-red-600 disabled:opacity-50 truncate"
      onClick={onClick}
      disabled={disabled}
      title="삭제"
    >
      삭제
    </Button>
  );
};

// Truncated text component for addresses
interface TruncatedTextProps {
  text: string;
  maxWidth?: string;
}

export const TruncatedText = ({ text, maxWidth = '200px' }: TruncatedTextProps) => {
  return (
    <Typography className="truncate" title={text}>
      {text}
    </Typography>
  );
};

// ID badge component
interface IdBadgeProps {
  id: string;
}

export const IdBadge = ({ id }: IdBadgeProps) => {
  return (
    <Typography variant="code" size="xs" className="truncate" title={`#${id}`}>
      #{id}
    </Typography>
  );
};
