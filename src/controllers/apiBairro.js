import React from 'react';
import apiFull from '../services/api';

export default function juncao(bairro, api) {
  try {
    let juncao = [];
    let media = 0;
    const anoValorJuncao = [];
    juncao = api.data.map((item) => {
      ano = new Date(item.ano);
      return parseInt(ano.getFullYear());
    });
    for (
      var ano = Math.min.apply(Math, juncao);
      ano <= Math.max.apply(Math, juncao);
      ano++
    ) {
      let indices = [];
      var idx = juncao.indexOf(ano);
      media = 0;
      while (idx != -1) {
        if (api.data[idx].bairro === bairro) {
          indices.push(idx);
        }
        idx = juncao.indexOf(ano, idx + 1);
      }
      for (var indice of indices) {
        media += api.data[indice].valor;
      }
      media /= indices.length;
      const label = new Date(api.data[indices[0]].ano);
      const anoLabel = label.getFullYear().toString();

      anoValorJuncao.push({
        label: anoLabel,
        data: media,
      });
    }

    return anoValorJuncao;
  } catch {
    return [{label: 'erro', data: 0}];
  }
}
