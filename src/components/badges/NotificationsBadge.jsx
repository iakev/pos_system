import React from 'react';
import Badge from '@mui/material/Badge';
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

export default function NotificationBadge() {
  return (
    <Badge badgeContent={4} color="secondary">
      <NotificationsNoneOutlinedIcon color="primary" />
    </Badge>
  );
}
