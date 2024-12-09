pub fn create_default_config() -> String {
  r#"{
"firebird": [
  {
    "ip": "localhost",
    "aliases": "eagleerp",
    "is_fiscal": "true"
  }
],
"diretorio": [],
"destino": [],
"backup_config": {
  "gbak_path": "C:\\Program Files\\Firebird\\Firebird_2_5\\bin\\gbak.exe",
  "username": "sysdba",
  "password": "masterkey"
}
}
    "#
    .to_string()
}