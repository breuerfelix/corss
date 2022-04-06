{ pkgs ? import <nixpkgs> {} }:
  pkgs.mkShell {
    buildInputs = with pkgs; [
      nodejs
      nodePackages.npm
      nodePackages.typescript
      nodePackages.typescript-language-server
    ];
}
