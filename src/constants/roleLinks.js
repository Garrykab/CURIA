export const roleLinks = {
  super_admin: [
    { to: '/super/dashboard', label: 'Dashboard' },
    { to: '/super/barreaux', label: 'Barreaux' },
  ],
  admin_barreau: [
    { to: '/barreau/dashboard', label: 'Dashboard' },
    { to: '/barreau/demandes', label: 'Demandes' },
    { to: '/barreau/avocats', label: 'Avocats' },
  ],
  avocat: [{ to: '/avocat/profil', label: 'Mon profil' }],
};

