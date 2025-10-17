import React, { useState } from 'react';
import Input from '../Atoms/Input';
import TextArea from '../Atoms/TextArea';
import Button from '../Atoms/NewsButton';

// 1. Définition de l'interface pour la structure des données de la news
interface NewsFormData {
  title: string;
  content: string;
}

const NewsEditorForm: React.FC = () => {
  // 2. État typé pour stocker les données du formulaire
  const [formData, setFormData] = useState<NewsFormData>({
    title: '',
    content: ''
  });
  
  // État pour gérer le statut de la soumission (feedback utilisateur)
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');

  // 3. Gestion des changements avec typage des événements pour Input/TextArea
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // Réinitialiser le statut lors de la modification
    if (submissionStatus !== 'idle') {
        setSubmissionStatus('idle');
        setMessage('');
    }
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // 4. Gestion de la soumission du formulaire avec typage de l'événement et appel API
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isFormInvalid = !formData.title.trim() || !formData.content.trim();
    if (isFormInvalid) {
        setMessage("Veuillez remplir tous les champs obligatoires.");
        return;
    }

    setSubmissionStatus('loading');
    setMessage('Envoi de la news en cours...');

    // Assurez-vous que cette URL correspond à votre endpoint Express (ex: POST /api/news)
    const API_URL = 'http://localhost:3000/api/news'; 

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            // Tentative de lire un message d'erreur du backend
            const errorData = await response.json().catch(() => ({ message: 'Erreur inconnue du serveur.' }));
            throw new Error(errorData.message || `Erreur serveur: Statut ${response.status}`);
        }

        const data = await response.json();

        // Succès
        console.log('News ajoutée:', data);
        setSubmissionStatus('success');
        setMessage('News publiée avec succès ! 🎉');
        
        // Réinitialiser le formulaire
        setFormData({ title: '', content: '' }); 

    } catch (error) {
        // Erreur réseau ou erreur lancée par le bloc ci-dessus
        const errorMessage = error instanceof Error ? error.message : "Une erreur inattendue est survenue.";
        console.error('Erreur lors de la soumission:', errorMessage);
        setSubmissionStatus('error');
        setMessage(`Erreur lors de la publication: ${errorMessage}`);
    }
  };

  const isFormInvalid = !formData.title.trim() || !formData.content.trim();

  return (
    <div className="news-editor-container">
      <h2>NEWS-EDITEUR</h2>
      <form onSubmit={handleSubmit}>
        
        {/* Champ Titre */}
        <Input
          label="Titre de la News (max 50 chars)"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required={true}
          maxLength={50} // Correspond à VARCHAR(50)
          disabled={submissionStatus === 'loading'}
        />

        {/* Champ Contenu */}
        <TextArea
          label="Contenu de la News"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required={true}
          rows={10} 
          disabled={submissionStatus === 'loading'}
        />

        {/* Zone de message de statut */}
        {message && (
            <p className={`message ${submissionStatus}`}>
                {message}
            </p>
        )}

        {/* Bouton de Soumission */}
        <Button 
          type="submit"
          disabled={isFormInvalid || submissionStatus === 'loading'} 
        >
          {submissionStatus === 'loading' ? 'Publication...' : 'Soumettre la News'}
        </Button>
      </form>
    </div>
  );
};

export default NewsEditorForm;