'use client'

import UserWrapper from "@/components/wrapper/UserWrapper"
import { Flex, Table, TextInput, Button, Group, Select, Badge, Pagination, Checkbox, Box, Card, SimpleGrid, Loader, Overlay, TextInput as MantineTextInput, Stack } from "@mantine/core"
import { IconSearch, IconUser, IconChalkboard, IconBook, IconEdit, IconTrash } from "@tabler/icons-react"
import { useState, useEffect } from "react"
import { notifications } from '@mantine/notifications';
import { modals } from '@mantine/modals';
import { api } from "@/lib/api-client"

const roleOptions = [
    { value: '', label: 'Эрх' },
    { value: 'ADMIN', label: 'Админ' },
    { value: 'TEACHER', label: 'Багш' },
    { value: 'USER', label: 'Хэрэглэгч' },
]

interface User {
    id: number;
    auth0_id: string;
    full_name: string;
    email: string;
    role: string;
    is_deleted: boolean;
    created_at: string;
    picture?: string;
}




const summary = [
    { icon: <IconUser size={32} color="#FFD600" />, label: 'Нийт хэрэглэгч', value: '211,120' },
    { icon: <IconChalkboard size={32} color="#FFD600" />, label: 'Нийт багш', value: '512' },
    { icon: <IconBook size={32} color="#FFD600" />, label: 'Нийт хичээл', value: '124' },
]


export const AdminUserManagement = () => {
    const [search, setSearch] = useState('')
    const [role, setRole] = useState('')
    const [page, setPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(15)
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(false)
    const [editLoading, setEditLoading] = useState(false)
    const [summary, setSummary] = useState([
        { icon: <IconUser size={32} color="#FFD600" />, label: 'Нийт хэрэглэгч', value: '0' },
        { icon: <IconChalkboard size={32} color="#FFD600" />, label: 'Нийт багш', value: '0' },
        { icon: <IconBook size={32} color="#FFD600" />, label: 'Нийт хичээл', value: '0' },
    ])

    const fetchUsers = async () => {
        try {
            setLoading(true)
            const data = await api.get<User[]>('/admin/user', { authType: 'token' })
            let filteredUsers = data.filter(user => {
                const matchesSearch = search
                    ? (user.full_name?.toLowerCase().includes(search.toLowerCase()) ||
                        user.email?.toLowerCase().includes(search.toLowerCase()))
                    : true
                const matchesRole = role ? user.role === role : true
                return matchesSearch && matchesRole
            })
            const startIndex = (page - 1) * rowsPerPage
            const endIndex = startIndex + rowsPerPage
            const paginatedUsers = filteredUsers.slice(startIndex, endIndex)
            setUsers(paginatedUsers)

            // summary calculation
            const totalUsers = data.length
            const totalTeachers = data.filter(u => u.role === 'TEACHER').length
            // lessons count: you may need to fetch from another endpoint, here set as 0 or keep previous
            setSummary([
                { icon: <IconUser size={32} color="#FFD600" />, label: 'Нийт хэрэглэгч', value: totalUsers.toLocaleString() },
                { icon: <IconChalkboard size={32} color="#FFD600" />, label: 'Нийт багш', value: totalTeachers.toLocaleString() },
                summary[2], // keep lessons as is for now
            ])
        } catch (error) {
            notifications.show({
                title: 'Алдаа',
                message: 'Хэрэглэгчдийн мэдээлэл ачаалахад алдаа гарлаа',
                color: 'red'
            })
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (userId: number) => {
        modals.openConfirmModal({
            title: 'Хэрэглэгч устгах',
            children: 'Энэ хэрэглэгчийг устгахдаа итгэлтэй байна уу?',
            labels: { confirm: 'Устгах', cancel: 'Болих' },
            confirmProps: { color: 'red' },
            onConfirm: async () => {
                try {
                    setLoading(true)
                    await api.delete(`/admin/user/${userId}`, { authType: 'token' })
                    notifications.show({
                        title: 'Амжилттай',
                        message: 'Хэрэглэгч амжилттай устгагдлаа',
                        color: 'green'
                    })
                    fetchUsers()
                } catch (error) {
                    notifications.show({
                        title: 'Алдаа',
                        message: 'Хэрэглэгч устгахад алдаа гарлаа',
                        color: 'red'
                    })
                } finally {
                    setLoading(false)
                }
            }
        })
    }

    const handleEdit = (user: User) => {
        modals.open({
            title: 'Хэрэглэгч засварлах',
            size: 'lg',
            children: (
                <Stack gap="md">
                    <MantineTextInput
                        label="Бүтэн нэр"
                        placeholder="Бүтэн нэрээ оруулна уу"
                        defaultValue={user.full_name}
                        required
                        disabled
                    />
                    <MantineTextInput
                        label="И-мэйл"
                        placeholder="И-мэйл хаягаа оруулна уу"
                        defaultValue={user.email}
                        required
                        disabled
                    />
                    <Select
                        label="Эрх"
                        placeholder="Эрх сонгоно уу"
                        data={roleOptions.filter(option => option.value !== '')}
                        defaultValue={user.role}
                        required
                        onChange={async (newRole) => {
                            if (!newRole || newRole === user.role) return;
                            try {
                                setEditLoading(true)
                                if (newRole === 'ADMIN') {
                                    await api.put('/admin/user/promote-to-admin', { auth0_id: user.auth0_id }, { authType: 'token' })
                                } else if (newRole === 'TEACHER') {
                                    await api.put(`/admin/user/${user.id}/promote-to-teacher`, { userId: user.auth0_id }, { authType: 'token' })
                                }
                                notifications.show({
                                    title: 'Амжилттай',
                                    message: 'Хэрэглэгчийн эрх амжилттай шинэчлэгдлээ',
                                    color: 'green'
                                })
                                modals.closeAll()
                                fetchUsers()
                            } catch (error) {
                                notifications.show({
                                    title: 'Алдаа',
                                    message: 'Хэрэглэгчийн эрх шинэчлэхэд алдаа гарлаа',
                                    color: 'red'
                                })
                            } finally {
                                setEditLoading(false)
                            }
                        }}
                        disabled={editLoading}
                    />
                    <Select
                        label="Төлөв"
                        placeholder="Төлөв сонгоно уу"
                        data={[
                            { value: 'false', label: 'Идэвхтэй' },
                            { value: 'true', label: 'Идэвхгүй' }
                        ]}
                        defaultValue={user.is_deleted ? 'true' : 'false'}
                        required
                        disabled
                    />
                    <Group justify="flex-end" mt="md">
                        <Button 
                            variant="default" 
                            onClick={() => modals.closeAll()}
                            disabled={editLoading}
                        >
                            Болих
                        </Button>
                    </Group>
                </Stack>
            )
        })
    }

    useEffect(() => {
        fetchUsers()
    }, [page, rowsPerPage, role, search])

    const totalRows = users.length + ((page - 1) * rowsPerPage)
    const totalPages = Math.ceil(totalRows / rowsPerPage)

    return (
        <UserWrapper
            breadcrumbs={[
                { label: "Админ", path: "/admin" },
                { label: "Хяналтын самбар" }
            ]}
        >
            {loading && (
                <Overlay blur={1} center>
                    <Loader size="lg" />
                </Overlay>
            )}
            <div className="w-full">
                <Box mb={24}>
                    <span style={{ color: '#8C8C8C', fontSize: 16 }}>Админ</span>
                    <span style={{ color: '#222', fontWeight: 500, fontSize: 16 }}> / Хяналтын самбар</span>
                </Box>

                <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={24} mb={32}>
                    {summary.map((item, i) => (
                        <Card key={i} shadow="sm" padding="lg" radius="md" withBorder style={{ minWidth: 220 }}>
                            <Flex align="center" gap={16}>
                                <Box>{item.icon}</Box>
                                <Flex direction="column" gap={2}>
                                    <span style={{ color: '#8C8C8C', fontSize: 15 }}>{item.label}</span>
                                    <span style={{ color: '#222', fontWeight: 600, fontSize: 22 }}>{item.value}</span>
                                </Flex>
                            </Flex>
                        </Card>
                    ))}
                </SimpleGrid>

                <Box mb={16} style={{ fontWeight: 600, fontSize: 20 }}>Хэрэглэгчдийн удирдлага</Box>

                <Flex gap={12} align="center" mb={12}>
                    <Select 
                        data={roleOptions} 
                        value={role} 
                        onChange={value => setRole(value || '')} 
                        w={120} 
                        radius="xl" 
                    />
                    <TextInput
                        placeholder="Хайх"
                        leftSection={<IconSearch size={16} />}
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        w={200}
                        radius="xl"
                    />
                    <Button
                        variant="default"
                        color="#8C8C8C"
                        style={{ color: '#8C8C8C', borderColor: '#E0E0E0' }}
                        radius="xl"
                    >
                        + Шүүлт нэмэх
                    </Button>
                </Flex>

                {/* Table */}
                <Box style={{ border: '1.5px solid #E0E0E0', borderRadius: 12, overflow: 'hidden', width: '100%', position: 'relative' }}>
                    <Table verticalSpacing="md" horizontalSpacing="md" highlightOnHover>
                        <thead style={{ background: '#fff' }}>
                            <tr>
                                <th style={{ padding: '12px 16px', fontWeight: 600, fontSize: 15, borderRight: '1.5px solid #E0E0E0', borderBottom: '1.5px solid #E0E0E0' }}><Checkbox /></th>
                                <th style={{ padding: '12px 16px', fontWeight: 600, fontSize: 15, borderRight: '1.5px solid #E0E0E0', borderBottom: '1.5px solid #E0E0E0' }}>Бүтэн нэр</th>
                                <th style={{ padding: '12px 16px', fontWeight: 600, fontSize: 15, borderRight: '1.5px solid #E0E0E0', borderBottom: '1.5px solid #E0E0E0' }}>И-мэйл</th>
                                <th style={{ padding: '12px 16px', fontWeight: 600, fontSize: 15, borderRight: '1.5px solid #E0E0E0', borderBottom: '1.5px solid #E0E0E0' }}>Эрх</th>
                                <th style={{ padding: '12px 16px', fontWeight: 600, fontSize: 15, borderRight: '1.5px solid #E0E0E0', borderBottom: '1.5px solid #E0E0E0' }}>Төлөв</th>
                                <th style={{ padding: '12px 16px', fontWeight: 600, fontSize: 15, borderRight: '1.5px solid #E0E0E0', borderBottom: '1.5px solid #E0E0E0' }}>Бүртгүүлсэн огноо</th>
                                <th style={{ padding: '12px 16px', fontWeight: 600, fontSize: 15, borderBottom: '1.5px solid #E0E0E0' }}>Үйлдэл</th>
                            </tr>
                        </thead>
                        <tbody style={{ background: 'transparent' }}>
                            {users.map((user, idx) => (
                                <tr
                                    key={user.id}
                                    style={{ borderBottom: idx !== users.length - 1 ? '1.5px solid #E0E0E0' : 'none' }}
                                >
                                    <td style={{ padding: '12px 16px', borderRight: '1.5px solid #E0E0E0' }}><Checkbox /></td>
                                    <td style={{ padding: '12px 16px', borderRight: '1.5px solid #E0E0E0' }}>
                                        <Flex align="center" gap={8}>
                                            {user.picture && <img src={user.picture} alt="" style={{ width: 28, height: 28, borderRadius: '50%' }} />}
                                            {user.full_name}
                                        </Flex>
                                    </td>
                                    <td style={{ padding: '12px 16px', borderRight: '1.5px solid #E0E0E0' }}>{user.email}</td>
                                    <td style={{ padding: '12px 16px', borderRight: '1.5px solid #E0E0E0' }}>
                                        {user.role === 'ADMIN' ? 'Админ' : user.role === 'TEACHER' ? 'Багш' : 'Хэрэглэгч'}
                                    </td>
                                    <td style={{ padding: '12px 16px', borderRight: '1.5px solid #E0E0E0' }}>
                                        <Badge color={!user.is_deleted ? 'green' : 'red'} variant="light" radius="sm">
                                            <Flex align="center" gap={4}>
                                                <Box style={{ width: 8, height: 8, borderRadius: 8, background: !user.is_deleted ? '#4CAF50' : '#F44336' }} />
                                                {!user.is_deleted ? 'Идэвхтэй' : 'Идэвхгүй'}
                                            </Flex>
                                        </Badge>
                                    </td>
                                    <td style={{ padding: '12px 16px', borderRight: '1.5px solid #E0E0E0' }}>
                                        {user.created_at ? new Date(user.created_at).toLocaleString('mn-MN') : ''}
                                    </td>
                                    <td style={{ padding: '12px 16px' }}>
                                        <Group gap={4}>
                                            <Button 
                                                leftSection={<IconEdit size={16} />} 
                                                size="xs" 
                                                variant="default" 
                                                color="#8C8C8C" 
                                                style={{ borderColor: '#E0E0E0' }}
                                                onClick={() => handleEdit(user)}
                                                loading={loading}
                                            >
                                                Засварлах
                                            </Button>
                                            <Button 
                                                leftSection={<IconTrash size={16} />} 
                                                size="xs" 
                                                variant="outline" 
                                                color="red"
                                                onClick={() => handleDelete(user.id)}
                                                loading={loading}
                                                disabled
                                            >
                                                Устгах
                                            </Button>
                                        </Group>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Box>

                <Flex justify="space-between" align="center" mt={16}>
                    <Group gap={4}>
                        <span style={{ color: '#8C8C8C', fontSize: 15 }}>Мөр тоо</span>
                        <Select 
                            data={[
                                { value: '15', label: '15' }, 
                                { value: '30', label: '30' }, 
                                { value: '50', label: '50' }
                            ]} 
                            value={String(rowsPerPage)} 
                            onChange={(value) => setRowsPerPage(Number(value))}
                            w={70} 
                        />
                        <span style={{ color: '#8C8C8C', fontSize: 15 }}>
                            {`${(page - 1) * rowsPerPage + 1}-${Math.min(page * rowsPerPage, totalRows)} / ${totalRows} мөр`}
                        </span>
                    </Group>
                    <Pagination 
                        total={totalPages} 
                        value={page} 
                        onChange={setPage} 
                        size="md" 
                        radius="xl" 
                    />
                </Flex>
            </div>
        </UserWrapper>
    )
}