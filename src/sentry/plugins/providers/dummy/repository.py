from __future__ import absolute_import

from sentry.plugins.providers.repository import RepositoryProvider


class DummyRepositoryProvider(RepositoryProvider):
    name = 'Example'
    has_installations = True

    def get_config(self):
        return [
            {
                'name': 'name',
                'label': 'Repository Name',
                'type': 'text',
                'placeholder': 'e.g. getsentry/sentry',
                'help': 'Enter your repository name.',
                'required': True,
            }
        ]

    def create_repository(self, organization, data, actor=None):
        return {
            'name': data['name'],
        }

    def compare_commits(self, repo, start_sha, end_sha, actor=None):
        return [
            {
                'id': '62de626b7c7cfb8e77efb4273b1a3df4123e6216',
                'repository': repo.name,
            }, {
                'id': '58de626b7c7cfb8e77efb4273b1a3df4123e6345',
                'repository': repo.name,
            }, {
                'id': end_sha,
                'repository': repo.name,
            }
        ]

    def get_installations(self, user):
        return [{
            'app_id': 12345,
            'installation_id': 54321,
            'external_id': 987612345,
            'external_slug': 'dummyorg',
        }]

    def get_repositories(self, installation):
        return [{
            'name': 'dummyorg/dummyrepo',
            'external_id': 123456,
            'url': 'https://www.github.com/dummyorg/dummyrepo',
            'provider': 'dummy',
        }]
