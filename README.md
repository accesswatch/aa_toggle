# Accessibility Alert Toggle

August 6, 2025

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

## What Does This Extension Do?

This extension empowers users—especially those using screen readers or who want a distraction-free environment—to quickly toggle all accessibility alerts in VS Code between “quiet” and “normal” modes. In “quiet” mode, all accessibility signals (such as sounds and spoken announcements for code actions, errors, chat, etc.) are silenced by setting their volume to 0. In “normal” mode, your preferred volume and alert settings are restored, ensuring you never lose your custom configuration.

This is ideal for:

- Users who want to temporarily silence all accessibility notifications (for focus, presentations, or privacy).
- Screen reader users who want a fast way to reduce or restore VS Code’s spoken feedback.
- Anyone who wants a single hotkey to manage all accessibility signal noise.

## What Settings Does It Touch?

The extension manages the following VS Code settings globally (across all workspaces):

- **`accessibility.signalOptions.volume`**  
  Controls the master volume for all accessibility signals.

  - `0` = silent/quiet mode (no sounds or spoken alerts)
  - Any other value = your preferred volume for normal mode

- **`accessibility.signals.*`**  
  These settings control the sound and announcement behavior for specific events in VS Code (e.g., editing, debugging, chat, errors, warnings, etc.).
  - Example:
    - `accessibility.signals.codeActionApplied.sound`
    - `accessibility.signals.codeActionApplied.announcement`
  - Values:
    - `"never"` = never play a sound or announcement
    - `"always"` = always play a sound or announcement

When toggling, the extension sets all these to “quiet” (no sound, no announcement) or restores your previous settings for “normal” mode.

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

[GitHub Repository](https://github.com/accesswatch/aa_toggle)

## Issues

Report issues or feature requests on the [GitHub Issues page](https://github.com/accesswatch/aa_toggle/issues).

## Release Notes

### 0.0.1

- Initial release with toggle, status bar, ARIA alert, persistence, and full accessibility signal management.
