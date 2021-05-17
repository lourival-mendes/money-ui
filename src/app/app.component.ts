import { Component, OnInit } from '@angular/core';

import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private primengConfig: PrimeNGConfig
  ) { }

  ngOnInit() {

    this.primengConfig.ripple = true;

    this.primengConfig.setTranslation({
      "startsWith": "Começando com",
      "contains": "Contém",
      "notContains": "Não contém",
      "endsWith": "Terminando com",
      "equals": "Igual",
      "notEquals": "Diferente",
      "noFilter": "Sem filtro",
      "lt": "Menor que",
      "lte": "Menor que ou igual",
      "gt": "Maior que",
      "gte": "Maior que ou igual",
      "is": "É",
      "isNot": "Não é",
      "before": "Após",
      "after": "Antes",
      "clear": "Limpar",
      "apply": "Aplicar",
      "matchAll": "Match All",
      "matchAny": "Match Any",
      "addRule": "Adicionar regra",
      "removeRule": "Remover regra",
      "accept": "Confirmar",
      "reject": "Cancelar",
      "choose": "Escolher",
      "upload": "Upload",
      "cancel": "Cancelar",
      "dayNames": ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
      "dayNamesShort": ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
      "dayNamesMin": ["Do", "Se", "Te", "Qa", "Qi", "Se", "Sa"],
      "monthNames": ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
      "monthNamesShort": ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
      "today": "Hoje",
      "weekHeader": "Cs",
      "weak": 'Fraca',
      "medium": 'Média',
      "strong": 'Forte',
      "passwordPrompt": 'Senha'
    });

  }

}
