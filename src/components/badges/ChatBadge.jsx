import React from 'react';
import Badge from '@mui/material/Badge';
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

export default function ChatBadge() {
    return (
        <Badge badgeContent={2} color="secondary">
            <ChatBubbleOutlineOutlinedIcon color="primary" />
        </Badge>
    );
}
