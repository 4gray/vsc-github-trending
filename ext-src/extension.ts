import * as path from 'path';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand('react-webview.start', () => {
            const panel = ReactPanel.createOrShow(context.extensionPath);

            // get configuration and send to web application
            const config = vscode.workspace.getConfiguration(
                'vsc-github-trending'
            );
            panel.sendConfig(config);
        })
    );
}

/**
 * Manages react webview panels
 */
class ReactPanel {
    /**
     * Track the currently panel. Only allow a single panel to exist at a time.
     */
    public static currentPanel: ReactPanel | undefined;

    private static readonly viewType = 'react';

    private readonly _panel: vscode.WebviewPanel;
    private readonly _extensionPath: string;
    private _disposables: vscode.Disposable[] = [];

    public static createOrShow(extensionPath: string) {
        const column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;

        // If we already have a panel, show it.
        // Otherwise, create a new panel.
        if (ReactPanel.currentPanel) {
            ReactPanel.currentPanel._panel.reveal(column);
        } else {
            ReactPanel.currentPanel = new ReactPanel(
                extensionPath,
                column || vscode.ViewColumn.One
            );
        }
        return ReactPanel.currentPanel;
    }

    private constructor(extensionPath: string, column: vscode.ViewColumn) {
        this._extensionPath = extensionPath;

        // Create and show a new webview panel
        this._panel = vscode.window.createWebviewPanel(
            ReactPanel.viewType,
            'VSC Github Trending',
            column,
            {
                // Enable javascript in the webview
                enableScripts: true,

                // And restrict the webview to only loading content from our extension's `media` directory.
                localResourceRoots: [
                    vscode.Uri.file(path.join(this._extensionPath, 'build')),
                ],
            }
        );

        // Set the webview's initial html content
        this._panel.webview.html = this._getHtmlForWebview();

        // Listen for when the panel is disposed
        // This happens when the user closes the panel or when the panel is closed programmatically
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

        // Handle messages from the webview
        this._panel.webview.onDidReceiveMessage(
            (message: any) => {
                switch (message.command) {
                    case 'alert':
                        vscode.window.showErrorMessage(message.text);
                        return;
                }
            },
            null,
            this._disposables
        );
    }

    public sendConfig(config: any) {
        // Send a message to the webview webview.
        // You can send any JSON serializable data.
        this._panel.webview.postMessage({ command: 'configuration', config });
    }

    public dispose() {
        ReactPanel.currentPanel = undefined;

        // Clean up our resources
        this._panel.dispose();

        while (this._disposables.length) {
            const x = this._disposables.pop();
            if (x) {
                x.dispose();
            }
        }
    }

    private _getHtmlForWebview() {
        const manifest = require(path.join(
            this._extensionPath,
            'build',
            'asset-manifest.json'
        ))['files'];
        const mainScript = manifest['main.js'];
        const mainStyle = manifest['main.css'];

        const scriptPathOnDisk = vscode.Uri.file(
            path.join(this._extensionPath, 'build', mainScript)
        );
        const scriptUri = scriptPathOnDisk.with({ scheme: 'vscode-resource' });
        const stylePathOnDisk = vscode.Uri.file(
            path.join(this._extensionPath, 'build', mainStyle)
        );
        const styleUri = stylePathOnDisk.with({ scheme: 'vscode-resource' });

        // Use a nonce to whitelist which scripts can be run
        const nonce = getNonce();

        return `<!DOCTYPE html>
			<html lang="en">
			<head>
                <meta charset="utf-8">
				<meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
				<meta name="theme-color" content="#000000">
				<title>Github Trending</title>
				<link rel="stylesheet" type="text/css" href="${styleUri}">

				<base href="${vscode.Uri.file(path.join(this._extensionPath, 'build')).with({
                    scheme: 'vscode-resource',
                })}/">
			</head>

			<body>
				<noscript>You need to enable JavaScript to run this app.</noscript>
				<div id="root"></div>

				<script nonce="${nonce}" src="${scriptUri}"></script>
			</body>
			</html>`;
    }
}

function getNonce() {
    let text = '';
    const possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
