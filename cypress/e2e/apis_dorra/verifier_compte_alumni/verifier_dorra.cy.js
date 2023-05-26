describe("Vérification du statut d alumni", () => {
  it("Vérification du statut d'un alumni avec succès (dossier accepté)", () => {
    const alumniCode = "NzcxXzE2ODIzNDkxMDE3NTZfNDg5";

    cy.request({
      method: "GET",
      url: `http://localhost:5000/alumnis/check/${alumniCode}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq(
        "Dossier accepté, vous pouvez vous connecter à votre espace"
      );
    });
  });

  it("Vérification du statut d'un alumni avec succès (dossier pas encore accepté)", () => {
    const alumniCode = "MjE4XzE2ODIzNDk4MDM1NDBfMjM=";

    cy.request({
      method: "GET",
      url: `http://localhost:5000/alumnis/check/${alumniCode}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq("Dossier pas encore accepté");
    });
  });
});
