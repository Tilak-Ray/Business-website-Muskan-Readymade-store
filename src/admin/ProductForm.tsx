import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Upload, X, Plus } from 'lucide-react';
import { doc, getDoc, setDoc, updateDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Product } from '../types';
import { Mic, MicOff, Sparkles, Loader2 } from 'lucide-react';

const ProductForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
  const audioChunksRef = React.useRef<Blob[]>([]);

  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    category: 'Women Kurti',
    gender: 'Women',
    description: '',
    material: '',
    sizes: ['M', 'L'],
    colors: ['Multi'],
    tags: [],
    image: '',
    images: [],
    status: 'Regular',
    featured: false,
    availability: true,
    price: 0,
    createdAt: new Date().toISOString()
  });

  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  // Helper: Convert File to Base64
  const toBase64 = (file: Blob): Promise<string> => 
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = error => reject(error);
    });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData(prev => ({ ...prev, image: event.target?.result as string }));
    };
    reader.readAsDataURL(file);

    // AI Analysis
    setAiLoading(true);
    try {
      const base64 = await toBase64(file);
      const res = await fetch('/api/ai/analyze-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64 })
      });
      const data = await res.json();
      if (data) {
        setFormData(prev => ({
          ...prev,
          name: data.name || prev.name,
          category: data.category || prev.category,
          gender: data.gender || prev.gender,
          material: data.material || prev.material,
          description: data.description || prev.description,
          tags: [...new Set([...(prev.tags || []), ...(data.tags || [])])]
        }));
      }
    } catch (error) {
      console.error("AI Analysis Error:", error);
    } finally {
      setAiLoading(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        handleVoiceAnalyze(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Recording error:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleVoiceAnalyze = async (audioBlob: Blob) => {
    setAiLoading(true);
    try {
      const audioBase64 = await toBase64(audioBlob);
      // If we have an image, we can send it too for better context
      let imageBase64 = '';
      if (formData.image && formData.image.startsWith('data:')) {
        imageBase64 = formData.image.split(',')[1];
      }

      const res = await fetch('/api/ai/analyze-audio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ audio: audioBase64, image: imageBase64 })
      });
      const data = await res.json();
      if (data) {
        setFormData(prev => ({
          ...prev,
          name: data.name || prev.name,
          category: data.category || prev.category,
          gender: data.gender || prev.gender,
          material: data.material || prev.material,
          description: data.description || prev.description,
          tags: [...new Set([...(prev.tags || []), ...(data.tags || [])])]
        }));
      }
    } catch (error) {
      console.error("AI Voice Error:", error);
    } finally {
      setAiLoading(false);
    }
  };

  useEffect(() => {
    if (isEditing && id) {
      const fetchProduct = async () => {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData(docSnap.data() as Product);
        }
      };
      fetchProduct();
    }
  }, [id, isEditing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing && id) {
        // For updates, we don't want to overwrite createdAt unless it's missing
        const { createdAt, ...otherData } = formData;
        await updateDoc(doc(db, 'products', id), {
          ...otherData,
          updatedAt: serverTimestamp()
        });
      } else {
        const newId = Date.now().toString();
        await setDoc(doc(db, 'products', newId), {
          ...formData,
          id: newId,
          createdAt: serverTimestamp()
        });
      }
      navigate('/admin/products');
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTag = () => {
    if (tagInput && !formData.tags?.includes(tagInput)) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), tagInput.startsWith('#') ? tagInput : `#${tagInput}`]
      });
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter(t => t !== tag)
    });
  };

  return (
    <div className="max-w-4xl space-y-12">
      <header className="flex items-center gap-6">
        <button onClick={() => navigate('/admin/products')} className="p-3 bg-white border border-brand-muted/20 rounded-full hover:bg-brand-card transition-colors">
          <ArrowLeft className="w-5 h-5 text-brand-dark" />
        </button>
        <div>
          <h1 className="serif text-4xl text-brand-dark">{isEditing ? 'Modify' : 'Introduce'} <span className="italic">Piece</span></h1>
          <div className="flex items-center gap-3 mt-2">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Inventory Management Pipeline</p>
            {aiLoading && (
              <span className="flex items-center gap-2 px-3 py-1 bg-brand-primary/5 text-brand-primary text-[8px] font-bold uppercase tracking-[0.2em] animate-pulse border border-brand-primary/10 rounded-full">
                <Sparkles className="w-3 h-3" />
                AI Curation in Progress...
              </span>
            )}
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="space-y-12">
        {/* Core Info */}
        <section className="bg-white p-12 border border-brand-muted/10 space-y-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <label className="block">
                <span className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.2em] mb-4 block">Product Identity</span>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  required
                  placeholder="E.G. SILK EMBROIDERED KURTI"
                  className="w-full pb-3 bg-transparent border-b border-brand-muted focus:border-brand-dark text-xs focus:outline-none transition-all uppercase tracking-widest placeholder:text-gray-300"
                />
              </label>

              <div className="grid grid-cols-2 gap-8">
                <label className="block">
                  <span className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.2em] mb-4 block">Category</span>
                  <select 
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    className="w-full pb-3 bg-transparent border-b border-brand-muted focus:border-brand-dark text-xs focus:outline-none transition-all uppercase tracking-widest cursor-pointer"
                  >
                    <option>Saree</option>
                    <option>Women Kurti</option>
                    <option>Lehenga</option>
                    <option>Men Shirt</option>
                    <option>Men Kurta</option>
                    <option>T-Shirt</option>
                    <option>Jackets</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.2em] mb-4 block">Gender</span>
                  <select 
                    value={formData.gender}
                    onChange={e => setFormData({...formData, gender: e.target.value as any})}
                    className="w-full pb-3 bg-transparent border-b border-brand-muted focus:border-brand-dark text-xs focus:outline-none transition-all uppercase tracking-widest cursor-pointer"
                  >
                    <option>Women</option>
                    <option>Men</option>
                    <option>Unisex</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="space-y-6">
              <label className="block">
                <span className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.2em] mb-4 block">Fabrication Details</span>
                <input 
                  type="text" 
                  value={formData.material}
                  onChange={e => setFormData({...formData, material: e.target.value})}
                  placeholder="E.G. 100% ORGANIC COTTON"
                  className="w-full pb-3 bg-transparent border-b border-brand-muted focus:border-brand-dark text-xs focus:outline-none transition-all uppercase tracking-widest placeholder:text-gray-300"
                />
              </label>
              <label className="block">
                <span className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.2em] mb-4 block">Status Tier</span>
                <div className="flex gap-4">
                  {['Regular', 'New Arrival', 'Trending'].map(status => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setFormData({...formData, status: status as any})}
                      className={`px-4 py-2 text-[8px] font-bold uppercase tracking-widest border transition-all ${
                        formData.status === status 
                        ? 'bg-brand-dark text-white border-brand-dark' 
                        : 'bg-transparent text-gray-400 border-brand-muted/30 hover:border-brand-muted'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </label>
            </div>
          </div>

          <label className="block">
            <span className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.2em] mb-4 block">Manifest Description</span>
            <textarea 
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              rows={3}
              placeholder="THE SOUL OF THIS PIECE..."
              className="w-full pb-3 bg-transparent border-b border-brand-muted focus:border-brand-dark text-xs focus:outline-none transition-all uppercase tracking-widest placeholder:text-gray-300 resize-none"
            />
          </label>
        </section>

        {/* Visuals & Attributes */}
        <section className="grid md:grid-cols-2 gap-12">
          <div className="bg-white p-12 border border-brand-muted/10 space-y-8">
            <label className="block">
              <span className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.2em] mb-4 block">Visual URL (Primary Image)</span>
              <div className="flex gap-4">
                <div className="flex-1">
                  <input 
                    type="url" 
                    value={formData.image}
                    onChange={e => setFormData({...formData, image: e.target.value})}
                    placeholder="HTTPS://IMAGES.UNSPLASH.COM/..."
                    className="w-full pb-3 bg-transparent border-b border-brand-muted focus:border-brand-dark text-xs focus:outline-none transition-all uppercase tracking-widest placeholder:text-gray-300"
                  />
                </div>
                {formData.image && (
                  <img src={formData.image} alt="Preview" className="w-12 h-12 object-cover rounded-sm border border-brand-muted/20" />
                )}
              </div>
            </label>

            <div className="space-y-4">
              <span className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.2em] block">Taxonomy Tags</span>
              <div className="flex gap-4">
                <input 
                  type="text" 
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  placeholder="#ETHNIC #SILK"
                  className="flex-1 pb-3 bg-transparent border-b border-brand-muted focus:border-brand-dark text-xs focus:outline-none transition-all uppercase tracking-widest placeholder:text-gray-300"
                />
                <button type="button" onClick={handleAddTag} className="p-2 border border-brand-muted/30 rounded-full hover:bg-brand-card transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags?.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-brand-card text-brand-dark text-[10px] font-bold uppercase tracking-widest rounded-sm flex items-center gap-1">
                    {tag}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => removeTag(tag)} />
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white p-12 border border-brand-muted/10 space-y-8">
             <div className="grid grid-cols-2 gap-8">
               <label className="block">
                  <span className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.2em] mb-4 block">Registry Status</span>
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      checked={formData.availability}
                      onChange={e => setFormData({...formData, availability: e.target.checked})}
                      className="w-4 h-4 accent-brand-accent"
                    />
                    <span className="text-[10px] font-bold text-brand-dark uppercase tracking-widest">In Stock</span>
                  </div>
               </label>
               <label className="block">
                  <span className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.2em] mb-4 block">Asset Value</span>
                  <input 
                    type="number" 
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                    className="w-full pb-3 bg-transparent border-b border-brand-muted focus:border-brand-dark text-xs focus:outline-none transition-all uppercase tracking-widest"
                  />
               </label>
             </div>
             
            <div className="p-6 bg-brand-card/50 border border-dashed border-brand-muted/30 rounded-sm flex flex-col items-center justify-center text-center space-y-4">
               <input 
                 type="file" 
                 ref={fileInputRef}
                 className="hidden" 
                 accept="image/*"
                 onChange={handleImageUpload}
               />
               
               <div className="flex flex-col items-center gap-3">
                 <button 
                  type="button" 
                  onClick={() => fileInputRef.current?.click()}
                  className="p-4 bg-white border border-brand-muted/20 rounded-full hover:bg-brand-card transition-all group"
                 >
                   <Upload className="w-6 h-6 text-brand-dark group-hover:scale-110 transition-transform" />
                 </button>
                 <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest leading-relaxed">
                   Upload Device Asset <br /> 
                   <span className="font-normal opacity-60 italic text-[8px]">AI will auto-populate details</span>
                 </p>
               </div>

               <div className="w-full h-[1px] bg-brand-muted/10 my-2" />

               <div className="flex flex-col items-center gap-3">
                  <button 
                    type="button" 
                    onMouseDown={startRecording}
                    onMouseUp={stopRecording}
                    onMouseLeave={stopRecording}
                    onTouchStart={startRecording}
                    onTouchEnd={stopRecording}
                    className={`p-4 rounded-full transition-all flex items-center justify-center ${
                      isRecording 
                      ? 'bg-red-500 text-white animate-pulse shadow-lg scale-110' 
                      : 'bg-brand-primary text-white hover:bg-brand-dark'
                    }`}
                  >
                    {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>
                  <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest leading-relaxed">
                    Voice Description <br /> 
                    <span className="font-normal opacity-60 italic text-[8px]">Hold to speak (Nepali/Hindi)</span>
                  </p>
               </div>
            </div>
          </div>
        </section>

        <footer className="flex justify-end gap-6">
          <button 
            type="button" 
            onClick={() => navigate('/admin/products')}
            className="px-10 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-brand-dark transition-colors"
          >
            Cancel Changes
          </button>
          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary py-5 px-16 text-[10px]"
          >
            {loading ? 'Processing...' : isEditing ? 'Optimize Piece' : 'Commit to Inventory'}
          </button>
        </footer>
      </form>
    </div>
  );
};

export default ProductForm;
