# Security Specification for Muskan Readymade

## Data Invariants
- Only authorized admins (UID present in `/admins`) can write to `products`, `gallery`, or `admins` collections.
- All users (including non-authenticated) can read `products` and `gallery` to view the catalog and brand images.
- All products must have a server-assigned `createdAt` timestamp.
- User email must be verified for any admin operation (if we were using user-owned content, but here it's strictly admin-managed).

## The Dirty Dozen Payloads
1. **Unauthorized Product Create**: Anonymous user tries to add a product.
2. **Unauthorized Product Update**: Non-admin user tries to change product price.
3. **Unauthorized Product Delete**: Non-admin user tries to delete a product.
4. **Admin Privilege Escalation**: User tries to add their own UID to `/admins`.
5. **Ghost Field Injection**: Admin tries to add an undocumented field `meta_secret` to a product.
6. **Invalid Status**: Admin tries to set status to `Super Trending`.
7. **Bypassing Server Timestamp**: Admin tries to set a custom old date for `createdAt`.
8. **Poisonous Document ID**: Admin tries to use a 1MB string as a product ID.
9. **Invalid Gender**: Admin tries to set gender to `Unknown`.
10. **Unauthorized Gallery Update**: Non-admin tries to replace the hero banner.
11. **Type Mismatch**: Admin tries to set `price` as a string.
12. **Missing Required Fields**: Admin tries to create a product without a name.

## Test Runner (Logic)
- Verify `allow read: if true` for products and gallery.
- Verify `allow write: if isAdmin()` for products, gallery, and admins.
- Verify `isValidProduct()` enforces strict keys and types.
