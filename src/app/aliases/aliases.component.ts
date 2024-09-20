import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';
import { open } from '@tauri-apps/api/dialog';
import { invoke } from '@tauri-apps/api/tauri';

interface AliasConfig {
    ip: string;
    alias: string;
}

interface DirectoryConfig {
    directory: string;
}

@Component({
    selector: 'app-aliases',
    templateUrl: './aliases.component.html',
    standalone: true,
    imports: [
        FormsModule,
        CommonModule,
        MenuComponent
    ],
    styleUrls: ['./aliases.component.scss']
})
export class AliasesComponent implements OnInit {
    aliasesConfig: AliasConfig[] = [];
    directoriesConfig: DirectoryConfig[] = [];
    newIp: string = '';
    newAlias: string = '';
    selectedDirectory: string | null = null;

    constructor(private router: Router) {}

    ngOnInit() {
        this.loadAliases();
        this.loadDirectories();
    }

    addAlias() {
        if (this.newIp && this.newAlias) {
            this.aliasesConfig.push({ ip: this.newIp, alias: this.newAlias });
            this.newIp = '';
            this.newAlias = '';
        }
    }

    removeAlias(index: number) {
        this.aliasesConfig.splice(index, 1);
    }

    async selectDirectory() {
        const result = await open({
            directory: true,
            multiple: false
        });
        if (result) {
            this.selectedDirectory = result as string;
            this.directoriesConfig.push({ directory: this.selectedDirectory });
        }
    }

    async saveConfigurations() {
        await this.saveAliases();
        await this.saveDirectories();
        this.router.navigate(['/dashboard']);
    }

    async saveAliases() {
        try {
            await invoke('save_aliases', { configs: this.aliasesConfig });
            console.log('Aliases salvos com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar aliases:', error);
        }
    }

    async loadAliases() {
        try {
            this.aliasesConfig = await invoke('load_aliases');
        } catch (error) {
            console.error('Erro ao carregar aliases:', error);
        }
    }

    async saveDirectories() {
        try {
            await invoke('save_directories', { configs: this.directoriesConfig });
            console.log('Diretórios salvos com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar diretórios:', error);
        }
    }

    async loadDirectories() {
        try {
            this.directoriesConfig = await invoke('load_directories');
        } catch (error) {
            console.error('Erro ao carregar diretórios:', error);
        }
    }
}