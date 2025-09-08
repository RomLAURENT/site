export type Lien = {
    type: string;
    nom: string;
    url: string;
    territoire: string;
    latitude: string;
    longitude: string;
};

export type Ressources = {
    type: string;
    icon: string;
    liens: Lien[];
};

export type Lieu = {
    nom: string;
    ressources: Ressources[];
    sousLieux: Lieu[];
};

export type LieuPlat = Omit<Lieu, 'sousLieux'> & { chemin: string[] };

export async function fetchGeoliens()  {
    // on tente d'abbord depuis le cms, puis la version local.

    // try {
    //   const response = await fetch('https://10s25.ovh/cms/?page=geoliens.json&var_mode=calcul');
    //   const hierarchie = await response.json() as Lieu[];
    //   return hierarchie;
    // } catch { }
    try {
        const response = await import('../data/geoliens.json');
        return response.default as unknown as Lieu[];
    } catch { }

    return [];
}

// utilitaire pour mettre a plat la hierarchie des lieux
export function applatirLieux(hierarchie: Lieu[], chemin: string[] = []) {
    return hierarchie.reduce((acc, { sousLieux, ...lieu}) => {
        if(lieu.ressources.length > 0) {
            acc.push({...lieu, chemin });
        }
        acc.push(...applatirLieux(sousLieux, [...chemin, lieu.nom]));
        return acc;
    }, [] as LieuPlat[]);
}
