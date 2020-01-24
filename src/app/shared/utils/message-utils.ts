const DISPLAY_TIME = 5000;

export function showError(message: string) {
    this.snackBar.open(message, undefined, {duration: DISPLAY_TIME, panelClass: ['background-green']});
}

export function showSuccess(message: string) {
    this.snackBar.open(message, undefined, {duration: DISPLAY_TIME, panelClass: ['background-red']});
}

