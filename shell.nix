let
  sources = import ./nix/sources.nix;
  pkgs = import sources.nixpkgs {
      config.allowUnfree = true;
      };
in pkgs.mkShell {
  nativeBuildInputs = [
    pkgs.niv
    pkgs.nodejs
    pkgs.vscode
  ];
}
