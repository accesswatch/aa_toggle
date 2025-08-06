"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const MODE_KEY = "accessibilityAlert.mode";
const ORIGINAL_SETTINGS_KEY = "accessibilityAlert.originalSettings";
const QUIET_SETTINGS = {
    "accessibility.signalOptions.volume": 0,
    "accessibility.signals.chatEditModifiedFile": {
        sound: "never",
        announcement: "never",
    },
    "accessibility.signals.chatRequestSent": {
        sound: "never",
        announcement: "never",
    },
    "accessibility.signals.chatResponseReceived": {
        sound: "never",
        announcement: "never",
    },
    "accessibility.signals.chatUserActionRequired": {
        sound: "never",
        announcement: "never",
    },
    "accessibility.signals.clear": { sound: "never", announcement: "never" },
    "accessibility.signals.codeActionApplied": {
        sound: "never",
        announcement: "never",
    },
    "accessibility.signals.codeActionTriggered": {
        sound: "never",
        announcement: "never",
    },
    "accessibility.signals.diffLineDeleted": {
        sound: "never",
        announcement: "never",
    },
    "accessibility.signals.diffLineInserted": {
        sound: "never",
        announcement: "never",
    },
    "accessibility.signals.diffLineModified": {
        sound: "never",
        announcement: "never",
    },
    "accessibility.signals.editsKept": { sound: "never", announcement: "never" },
    "accessibility.signals.editsUndone": {
        sound: "never",
        announcement: "never",
    },
    "accessibility.signals.format": { sound: "never", announcement: "never" },
    "accessibility.signals.lineHasBreakpoint": {
        sound: "never",
        announcement: "never",
    },
    "accessibility.signals.lineHasError": {
        sound: "never",
        announcement: "never",
    },
    "accessibility.signals.lineHasFoldedArea": {
        sound: "never",
        announcement: "never",
    },
    "accessibility.signals.lineHasInlineSuggestion": {
        sound: "never",
        announcement: "never",
    },
    "accessibility.signals.lineHasWarning": {
        sound: "never",
        announcement: "never",
    },
    "accessibility.signals.nextEditSuggestion": {
        sound: "never",
        announcement: "never",
    },
    "accessibility.signals.noInlayHints": {
        sound: "never",
        announcement: "never",
    },
    "accessibility.signals.notebookCellCompleted": {
        sound: "never",
        announcement: "never",
    },
    "accessibility.signals.notebookCellFailed": {
        sound: "never",
        announcement: "never",
    },
    "accessibility.signals.onDebugBreak": {
        sound: "never",
        announcement: "never",
    },
    "accessibility.signals.positionHasError": {
        sound: "never",
        announcement: "never",
    },
    "accessibility.signals.positionHasWarning": {
        sound: "never",
        announcement: "never",
    },
    "accessibility.signals.progress": { sound: "never", announcement: "never" },
    "accessibility.signals.save": { sound: "never", announcement: "never" },
    "accessibility.signals.taskCompleted": {
        sound: "never",
        announcement: "never",
    },
    "accessibility.signals.taskFailed": { sound: "never", announcement: "never" },
    "accessibility.signals.terminalBell": {
        sound: "never",
        announcement: "never",
    },
    "accessibility.signals.terminalCommandFailed": {
        sound: "never",
        announcement: "never",
    },
    "accessibility.signals.terminalCommandSucceeded": {
        sound: "never",
        announcement: "never",
    },
    "accessibility.signals.terminalQuickFix": {
        sound: "never",
        announcement: "never",
    },
    "accessibility.signals.voiceRecordingStarted": {
        sound: "never",
        announcement: "never",
    },
    "accessibility.signals.voiceRecordingStopped": {
        sound: "never",
        announcement: "never",
    },
};
function activate(context) {
    // Create output channel for error logging
    const outputChannel = vscode.window.createOutputChannel("Accessibility Alert Toggle");
    context.subscriptions.push(outputChannel);
    // Get status bar priority from configuration
    const config = vscode.workspace.getConfiguration();
    const statusBarPriority = config.get("accessibilityAlert.statusBarPriority", 100);
    // Create status bar item
    const statusBarItem = vscode.window.createStatusBarItem("accessibilityAlertStatus", vscode.StatusBarAlignment.Left, statusBarPriority);
    statusBarItem.command = "accessibilityAlert.toggle";
    statusBarItem.tooltip =
        "Toggle accessibility alert mode (quiet/normal). Press Ctrl+Shift+' or run Accessibility Alert Toggle: Help for more info.";
    context.subscriptions.push(statusBarItem);
    // Load mode from global state
    let mode = context.globalState.get(MODE_KEY, "normal");
    // Restore settings and update status bar on activation
    (async () => {
        try {
            if (mode === "quiet") {
                await applySettings(QUIET_SETTINGS);
            }
            else {
                const originalSettings = context.globalState.get(ORIGINAL_SETTINGS_KEY);
                if (originalSettings) {
                    await applySettings(originalSettings);
                }
            }
            updateStatusBar();
        }
        catch (err) {
            outputChannel.appendLine("Failed to restore settings: " + String(err));
            vscode.window.showErrorMessage("Accessibility Alert Toggle: Failed to restore settings. " + String(err));
        }
    })();
    function updateStatusBar() {
        statusBarItem.text = `Accessibility: ${mode === "quiet" ? "Quiet" : "Normal"}`;
        statusBarItem.accessibilityInformation = {
            label: `Accessibility alert mode is now ${mode}`,
            role: "status",
        };
        statusBarItem.show();
    }
    function announceModeChange() {
        vscode.window.showInformationMessage(`Accessibility alert mode is now ${mode}`);
    }
    async function applySettings(settings) {
        const config = vscode.workspace.getConfiguration();
        const updatePromises = Object.keys(settings).map((key) => {
            const currentValue = config.get(key);
            if (JSON.stringify(currentValue) !== JSON.stringify(settings[key])) {
                return config.update(key, settings[key], vscode.ConfigurationTarget.Global);
            }
            return Promise.resolve();
        });
        await Promise.all(updatePromises);
    }
    async function getCurrentSettings() {
        const config = vscode.workspace.getConfiguration();
        const keys = Object.keys(QUIET_SETTINGS);
        const current = {};
        for (const key of keys) {
            current[key] = config.get(key);
        }
        return current;
    }
    async function setMode(newMode) {
        mode = newMode;
        try {
            await context.globalState.update(MODE_KEY, mode);
            let originalSettings;
            if (mode === "quiet") {
                originalSettings = await getCurrentSettings();
                await context.globalState.update(ORIGINAL_SETTINGS_KEY, originalSettings);
                await applySettings(QUIET_SETTINGS);
            }
            else {
                originalSettings = context.globalState.get(ORIGINAL_SETTINGS_KEY);
                if (originalSettings) {
                    await applySettings(originalSettings);
                }
                else {
                    outputChannel.appendLine("No original settings found to restore.");
                    vscode.window.showWarningMessage("Accessibility Alert Toggle: No original settings found to restore.");
                }
            }
            updateStatusBar();
            announceModeChange();
            vscode.window.setStatusBarMessage(`Accessibility alert mode: ${mode}`, 2000);
        }
        catch (err) {
            outputChannel.appendLine("Failed to toggle mode: " + String(err));
            vscode.window.showErrorMessage("Accessibility Alert Toggle: Failed to toggle mode. " + String(err));
        }
    }
    // Debounce utility
    function debounce(fn, delay) {
        let timer;
        return ((...args) => {
            if (timer !== undefined)
                clearTimeout(timer);
            timer = setTimeout(() => fn(...args), delay);
        });
    }
    // Register toggle command
    const debouncedSetMode = debounce(setMode, 300);
    const toggleCommand = vscode.commands.registerCommand("accessibilityAlert.toggle", async () => {
        debouncedSetMode(mode === "quiet" ? "normal" : "quiet");
    });
    context.subscriptions.push(toggleCommand);
    // Register help command
    const helpCommand = vscode.commands.registerCommand("accessibilityAlert.help", () => {
        vscode.window.showInformationMessage("Accessibility Alert Toggle: Use Ctrl+Shift+' to toggle quiet/normal mode. The status bar shows the current mode. You can configure the status bar priority in settings.");
    });
    context.subscriptions.push(helpCommand);
    // Register feedback command
    const feedbackCommand = vscode.commands.registerCommand("accessibilityAlert.feedback", () => {
        vscode.env.openExternal(vscode.Uri.parse("https://github.com/example-publisher/accessibility-alert-toggle/issues"));
        vscode.window.showInformationMessage("Thank you for your feedback! Please describe your issue or suggestion in the browser window that opened.");
    });
    context.subscriptions.push(feedbackCommand);
    // Initial status bar update
    updateStatusBar();
}
exports.activate = activate;
// tsconfig.json should include "dom" in the lib array for setTimeout/clearTimeout support
// Example:
// "lib": ["es2020", "dom"]
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map