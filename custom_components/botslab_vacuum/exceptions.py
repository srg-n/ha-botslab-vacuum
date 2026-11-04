"""Exceptions for the Botslab Vacuum integration."""
from __future__ import annotations

from homeassistant.exceptions import HomeAssistantError

from .const import DOMAIN


class BotslabError(HomeAssistantError):
    """Base exception for Botslab Vacuum errors."""

    translation_domain = DOMAIN


class BotslabAuthError(BotslabError):
    """Exception raised when authentication fails."""

    translation_key = "invalid_auth"


class BotslabCaptchaRequired(BotslabAuthError):
    """Exception raised when QUC login requires solving a graphic captcha."""

    translation_key = "captcha_required"

    def __init__(
        self,
        message: str = "Graphic captcha required",
        sc: str = "",
        captcha_type: str = "graph",
    ) -> None:
        super().__init__(message)
        self.sc = sc
        self.captcha_type = captcha_type


class BotslabApiError(BotslabError):
    """Exception raised when communication with Botslab API fails."""

    translation_key = "cannot_connect"


class BotslabCommandError(BotslabError):
    """Exception raised when a command sent to the vacuum fails."""

    translation_key = "command_failed"


class BotslabDeviceOfflineError(BotslabError):
    """Exception raised when the vacuum is offline."""

    translation_key = "device_offline"
