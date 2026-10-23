| Function | Member | Booth | Constituency | District | Wing | State | Super Admin |
|---|---:|---:|---:|---:|---:|---:|---:|
| View public profile | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| View phone | Consent | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| View full address | No | Limited | ✓ | ✓ | ✓ | ✓ | ✓ |
| View legal disclosure | No | No | Restricted | Restricted | Restricted | Authorised | ✓ |
| Edit own profile | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Verify member | No | ✓ | ✓ | ✓ | Wing only | ✓ | ✓ |
| Change role | No | No | Restricted | ✓ | Wing only | ✓ | ✓ |
| Export members | No | No | No | Restricted | Restricted | Restricted | ✓ |

Do not implement permissions from memory.

Always refer to this RBAC matrix.

Backend authorization is authoritative.

Frontend permissions are only for UI visibility.

AI tools must use the same authorization system.