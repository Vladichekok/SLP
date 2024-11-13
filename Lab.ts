interface BaseContent {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  status: 'draft' | 'published' | 'archived';
}
interface Article extends BaseContent {
  title: string;
  content: string;
  author: string;
  tags: string[];
}
interface Product extends BaseContent {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}
// Тип операцій з контентом
type ContentOperations<T extends BaseContent> = {
  create: (data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>) => T;
  update: (id: string, updates: Partial<T>) => T;
  delete: (id: string) => boolean;
  findById: (id: string) => T | undefined;
  findAll: () => T[];
};
const articleOperations: ContentOperations<Article> = {
  create: (data) => ({
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date(),
    updatedAt: new Date(),
    status: 'draft',
  }),
  update: (id, updates) => ({
    ...updates,
    id,
    updatedAt: new Date(),
  }) as Article,
  delete: (id) => true,
  findById: (id) => undefined,
  findAll: () => [],
};
type Role = 'admin' | 'editor' | 'viewer';

type Permission = {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
};

// Система контролю доступу
type AccessControl<T extends BaseContent> = {
  [K in Role]: Permission;
};
const articleAccessControl: AccessControl<Article> = {
  admin: { create: true, read: true, update: true, delete: true },
  editor: { create: true, read: true, update: true, delete: false },
  viewer: { create: false, read: true, update: false, delete: false },
};
// Тип результату валідації
type ValidationResult = {
  isValid: boolean;
  errors?: string[];
};

// Базовий валідатор
type Validator<T> = {
  validate: (data: T) => ValidationResult;
};
// Валідатор для статті
const articleValidator: Validator<Article> = {
  validate: (data) => {
    const errors: string[] = [];
    if (!data.title) errors.push("Title is required");
    if (!data.content) errors.push("Content is required");
    return { isValid: errors.length === 0, errors };
  },
};

// Валідатор для продукту
const productValidator: Validator<Product> = {
  validate: (data) => {
    const errors: string[] = [];
    if (data.price < 0) errors.push("Price must be positive");
    if (data.stock < 0) errors.push("Stock must be non-negative");
    return { isValid: errors.length === 0, errors };
  },
};
// Композитний валідатор для різних типів контенту
type CompositeValidator<T extends BaseContent> = Validator<T>[];

const validateContent = <T extends BaseContent>(
  data: T,
  validators: CompositeValidator<T>
): ValidationResult => {
  const errors: string[] = [];
  for (const validator of validators) {
    const result = validator.validate(data);
    if (!result.isValid) {
      errors.push(...(result.errors ?? []));
    }
  }
  return { isValid: errors.length === 0, errors };
};
// Тип для версіонування контенту
type Versioned<T extends BaseContent> = T & {
  version: number;
  previousVersionId?: string;
  changeLog?: string;
};

// Операції з версіонованим контентом
type VersionedOperations<T extends BaseContent> = {
  saveVersion: (data: Versioned<T>) => Versioned<T>;
  getVersions: (id: string) => Versioned<T>[];
};

// Приклад використання версіонування для статей
const versionedArticleOperations: VersionedOperations<Article> = {
  saveVersion: (data) => {
    return {
      ...data,
      version: data.version + 1,
      updatedAt: new Date(),
      previousVersionId: data.id,
    };
  },
  getVersions: (id) => [],
};
// Тестова стаття
const testArticle: Versioned<Article> = {
  id: "1",
  title: "Hello World",
  content: "ZXCZXCZXC",
  author: "Vlad",
  tags: ["test"],
  createdAt: new Date(),
  updatedAt: new Date(),
  status: 'draft',
  version: 1,
};

// Збереження нової версії статті
const newVersion = versionedArticleOperations.saveVersion(testArticle);
console.log("Нова версія статті:", newVersion);
