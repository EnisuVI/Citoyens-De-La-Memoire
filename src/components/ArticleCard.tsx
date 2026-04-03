type ArticleCardProps = {
  titre: string
  date: string
  extrait: string
  image?: string
  slug: string
}

export default function ArticleCard({ titre, date, extrait, image, slug }: ArticleCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition group">
      
      {/* Image */}
      {image && (
        <div className="overflow-hidden h-48">
          <img
            src={image}
            alt={titre}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
        </div>
      )}

      {/* Contenu */}
      <div className="p-6">
        <p className="text-xs text-accent uppercase tracking-wider mb-2">{date}</p>
        <h3 className="font-serif text-lg font-bold text-primary mb-3 leading-snug">
          {titre}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">{extrait}</p>
        <a
          href={`/articles/${slug}`}
          className="text-sm font-semibold text-accent hover:underline"
        >
          Lire la suite →
        </a>
      </div>
    </article>
  )
}
