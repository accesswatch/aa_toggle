# Accessibility Alert Toggle

![Extension Icon](images/icon.png)

This VS Code extension allows you to toggle accessibility alert mode between quiet and normal using a hotkey (`Alt+Shift+S`). The current mode is shown in the status bar, and changes are announced for screen readers. All accessibility signal settings, including volume, are managed automatically.

## Features

- Toggle accessibility alert mode (quiet/normal) with Alt+Shift+S
- Status bar indicator for current mode
- ARIA alert for screen readers when mode changes
- Global persistence of all accessibility signal settings
- Stores and restores all accessibility signal settings, including volume
- User feedback command

## Usage

- Press Alt+Shift+S to toggle between quiet and normal modes.
- The status bar will update to show the current mode.
- Screen readers will announce the change.
- All accessibility signal settings are stored and restored automatically.
- Volume is always set to 0 in quiet mode and restored to its previous value in normal mode.

## Extension Settings

- `accessibilityAlert.statusBarPriority`: Priority of the status bar item (higher = more left).

## Accessibility Notes

- The extension uses VS Code notifications for ARIA alerts. These are read by most screen readers.
- The status bar item is accessible and includes an ARIA label.
- All settings changes are global and persist across VS Code sessions.

## Troubleshooting

- If you do not hear announcements, ensure notifications are enabled and your screen reader is focused on VS Code.
- If toggling is slow, try reducing the number of accessibility signals in your settings.
- If settings are not restored, check for errors in the VS Code notification area.

## FAQ

**Q: Can I change the hotkey?**  
A: Yes, you can override the keybinding in your VS Code keyboard shortcuts settings. The default is `Alt+Shift+S`.

**Q: Does this extension sync settings across devices?**  
A: Yes, if you use VS Code Settings Sync, your global settings will sync.

**Q: How do I provide feedback or report an issue?**  
A: Use the command palette and run `Accessibility Alert Toggle: Send Feedback`.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Repository

[GitHub Repository](https://github.com/example-publisher/accessibility-alert-toggle)

## Issues

Report issues or feature requests on the [GitHub Issues page](https://github.com/example-publisher/accessibility-alert-toggle/issues).

## Release Notes

### 0.0.1

- Initial release with toggle, status bar, ARIA alert, persistence, and full accessibility signal management.
