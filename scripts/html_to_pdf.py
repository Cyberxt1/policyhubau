from __future__ import annotations

import argparse
from pathlib import Path
from tkinter import Tk, filedialog


def html_files(folder: Path, recursive: bool) -> list[Path]:
    patterns = ("*.html", "*.htm")
    files: list[Path] = []

    for pattern in patterns:
        files.extend(folder.rglob(pattern) if recursive else folder.glob(pattern))

    return sorted({file.resolve() for file in files})


def output_path(input_file: Path, input_folder: Path, output_folder: Path) -> Path:
    relative = input_file.relative_to(input_folder.resolve())
    return output_folder / relative.with_suffix(".pdf")


def convert_folder(
    input_folder: Path,
    output_folder: Path,
    recursive: bool,
    overwrite: bool,
) -> None:
    try:
        from playwright.sync_api import sync_playwright
    except ImportError as exc:
        raise SystemExit(
            "Missing dependency: playwright\n"
            "Install it with:\n"
            "  pip install playwright\n"
            "  python -m playwright install chromium"
        ) from exc

    input_folder = input_folder.resolve()
    output_folder = output_folder.resolve()

    if not input_folder.is_dir():
        raise SystemExit(f"Input folder does not exist: {input_folder}")

    files = html_files(input_folder, recursive)
    if not files:
        print(f"No .html or .htm files found in {input_folder}")
        return

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch()
        page = browser.new_page()

        for html_file in files:
            pdf_file = output_path(html_file, input_folder, output_folder)
            pdf_file.parent.mkdir(parents=True, exist_ok=True)

            if pdf_file.exists() and not overwrite:
                print(f"Skipped existing: {pdf_file}")
                continue

            page.goto(html_file.as_uri(), wait_until="networkidle")
            page.pdf(path=str(pdf_file), format="A4", print_background=True)
            print(f"Created: {pdf_file}")

        browser.close()


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Convert all .html and .htm files in a folder to PDF files."
    )
    parser.add_argument(
        "folder",
        type=Path,
        nargs="?",
        help="Folder containing .html or .htm files.",
    )
    parser.add_argument(
        "-o",
        "--output",
        type=Path,
        help="Folder for generated PDFs. Defaults to the input folder.",
    )
    parser.add_argument(
        "-r",
        "--recursive",
        action="store_true",
        help="Also convert files in subfolders.",
    )
    parser.add_argument(
        "--overwrite",
        action="store_true",
        help="Replace PDFs that already exist.",
    )
    return parser.parse_args()


def pick_folder() -> Path:
    root = Tk()
    root.withdraw()
    root.attributes("-topmost", True)

    folder = filedialog.askdirectory(title="Select folder containing HTML files")
    root.destroy()

    if not folder:
        raise SystemExit("No folder selected.")

    return Path(folder)


def main() -> None:
    args = parse_args()
    input_folder = args.folder or pick_folder()

    convert_folder(
        input_folder=input_folder,
        output_folder=args.output or input_folder,
        recursive=args.recursive,
        overwrite=args.overwrite,
    )


if __name__ == "__main__":
    main()
