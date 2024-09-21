use serde::{Serialize, Deserialize};
use std::fs;
use tauri::command;
use std::path::PathBuf;

#[derive(Serialize, Deserialize)]
pub struct DirectoryConfig {
    pub directory: String,
}

fn get_directories_path() -> PathBuf {
    let mut path = std::env::current_dir().expect("Failed to get current directory");
    path.push("../json/directories.json");
    path
}

#[command]
pub fn save_directories(configs: Vec<DirectoryConfig>) -> Result<(), String> {
    let json = serde_json::to_string(&configs).map_err(|e| e.to_string())?;
    fs::write(get_directories_path(), json).map_err(|e| e.to_string())?;
    Ok(())
}

#[command]
pub fn load_directories() -> Result<Vec<DirectoryConfig>, String> {
    let data = fs::read_to_string(get_directories_path()).map_err(|e| e.to_string())?;
    let configs: Vec<DirectoryConfig> = serde_json::from_str(&data).map_err(|e| e.to_string())?;
    Ok(configs)
}