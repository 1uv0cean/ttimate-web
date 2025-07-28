'use client';

import { Badge } from '@/components/ui/Badge';
import { Typography } from '@/components/ui/Typography';

// ID Badge Component
interface IdBadgeProps {
  id: number | string;
}

export const IdBadge = ({ id }: IdBadgeProps) => {
  return (
    <Typography variant="code" size="xs">
      #{id}
    </Typography>
  );
};

// Name Badge Component
interface NameBadgeProps {
  name: string;
}

export const NameBadge = ({ name }: NameBadgeProps) => {
  return <Typography weight="medium">{name}</Typography>;
};

// Email Display Component
interface EmailDisplayProps {
  email: string;
}

export const EmailDisplay = ({ email }: EmailDisplayProps) => {
  return <Typography color="muted">{email}</Typography>;
};

// Role Badge Component
interface RoleBadgeProps {
  role: string;
}

export const RoleBadge = ({ role }: RoleBadgeProps) => {
  const getRoleVariant = (role: string) => {
    switch (role) {
      case 'Admin':
        return 'purple';
      case 'Moderator':
        return 'info';
      default:
        return 'muted';
    }
  };

  return (
    <Badge variant={getRoleVariant(role)} size="sm">
      {role}
    </Badge>
  );
};

// Status Badge Component
interface StatusBadgeProps {
  status: string;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'completed':
        return 'success';
      case 'pending':
      case 'processing':
        return 'warning';
      case 'inactive':
      case 'cancelled':
        return 'destructive';
      default:
        return 'muted';
    }
  };

  return (
    <Badge variant={getStatusVariant(status)} size="sm">
      {status}
    </Badge>
  );
};

// Date Display Component
interface DateDisplayProps {
  date: string;
}

export const DateDisplay = ({ date }: DateDisplayProps) => {
  return <Typography size="sm">{date}</Typography>;
};

// Product with Featured Badge Component
interface ProductDisplayProps {
  name: string;
  featured: boolean;
}

export const ProductDisplay = ({ name, featured }: ProductDisplayProps) => {
  return (
    <div className="flex items-center gap-2">
      <Typography weight="medium">{name}</Typography>
      {featured && (
        <Badge variant="warning" size="sm">
          Featured
        </Badge>
      )}
    </div>
  );
};

// Price Display Component
interface PriceDisplayProps {
  price: number;
}

export const PriceDisplay = ({ price }: PriceDisplayProps) => {
  return <Typography weight="medium">${price}</Typography>;
};

// Stock Status Component
interface StockStatusProps {
  stock: number;
}

export const StockStatus = ({ stock }: StockStatusProps) => {
  const getStockVariant = (stock: number) => {
    if (stock === 0) return 'destructive';
    if (stock < 10) return 'warning';
    if (stock < 50) return 'info';
    return 'success';
  };

  const getStockText = (stock: number) => {
    if (stock === 0) return 'Out of Stock';
    if (stock < 10) return 'Low Stock';
    if (stock < 50) return 'In Stock';
    return 'Well Stocked';
  };

  return (
    <div className="space-y-1">
      <Badge variant={getStockVariant(stock)} size="sm">
        {getStockText(stock)}
      </Badge>
    </div>
  );
};

// Rating Display Component
interface RatingDisplayProps {
  rating: number;
}

export const RatingDisplay = ({ rating }: RatingDisplayProps) => {
  const getRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push('★');
    }
    if (hasHalfStar) {
      stars.push('☆');
    }
    return stars.join('');
  };

  return (
    <div className="flex space-x-1">
      <Typography size="sm" customColor="#facc15">
        {getRatingStars(rating)}
      </Typography>
    </div>
  );
};

// Order ID Display Component
interface OrderIdDisplayProps {
  orderId: string;
}

export const OrderIdDisplay = ({ orderId }: OrderIdDisplayProps) => {
  return (
    <Typography variant="code" size="sm">
      {orderId}
    </Typography>
  );
};

// Currency Display Component
interface CurrencyDisplayProps {
  amount: number;
  decimals?: number;
}

export const CurrencyDisplay = ({ amount, decimals = 2 }: CurrencyDisplayProps) => {
  return <Typography weight="medium">${amount.toFixed(decimals)}</Typography>;
};

// Items Count Display Component
interface ItemsCountProps {
  count: number;
}

export const ItemsCount = ({ count }: ItemsCountProps) => {
  return <Typography weight="medium">{count}</Typography>;
};
